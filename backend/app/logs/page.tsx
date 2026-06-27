'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock Logs
const initialLogs = [
  { id: '1', connection: 'Shopify US', status: 'Success', records: 1240, time: '10 mins ago', error: null },
  { id: '2', connection: 'Salesforce CRM', status: 'Failed', records: 0, time: '25 mins ago', error: '{"code": "SCHEMA_MISMATCH", "details": "Expected field ContactID to be String, received Number."}' },
  { id: '3', connection: 'Stripe Billing', status: 'Success', records: 85, time: '1 hour ago', error: null },
];

export default function LogsViewer() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate network delay for skeleton loader demonstration
    setTimeout(() => {
      setLogs(initialLogs);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAnalyze = async (id: string, errorPayload: any) => {
    setAnalyzingId(id);
    
    // Simulate Vercel AI SDK stream
    const suggestion = "Schema mismatch detected: The source API sent a Number for ContactID, but DynamoDB expects a String. Click 'Auto-Heal & Retry' to automatically cast this field and re-run the sync.";
    
    // Mocking a streaming effect
    let currentText = "";
    for (let i = 0; i < suggestion.length; i++) {
      await new Promise(r => setTimeout(r, 20)); // Fast typing effect
      currentText += suggestion[i];
      setAiSuggestions(prev => ({ ...prev, [id]: currentText }));
    }
    setAnalyzingId(null);
  };

  const handleRetry = (id: string) => {
    // Optimistic UI update
    setLogs(prev => prev.map(log => 
      log.id === id ? { ...log, status: 'Syncing...' } : log
    ));

    // Clear AI suggestion for this row
    setAiSuggestions(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    // Simulate eventual success
    setTimeout(() => {
      setLogs(prev => prev.map(log => 
        log.id === id ? { ...log, status: 'Success', records: 50, time: 'Just now', error: null } : log
      ));
    }, 2000);
  };

  return (
    <div className="container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Sync Logs</h1>
          <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>&larr; Back to Dashboard</Link>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Connection</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Time</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions / Diagnostics</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeleton Empty State
                [1, 2, 3].map(i => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '1rem' }}><div className="skeleton" style={{ height: '20px', width: '120px' }}></div></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton" style={{ height: '24px', width: '80px', borderRadius: '99px' }}></div></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton" style={{ height: '20px', width: '90px' }}></div></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton" style={{ height: '40px', width: '100%' }}></div></td>
                  </tr>
                ))
              ) : logs.length === 0 ? (
                // True Empty State
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📭</div>
                    <p>No sync logs available yet.</p>
                  </td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', verticalAlign: 'top' }}>
                    <td style={{ padding: '1rem', fontWeight: 500, paddingTop: '1.25rem' }}>{log.connection}</td>
                    <td style={{ padding: '1rem', paddingTop: '1.25rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '99px', 
                        fontSize: '0.75rem',
                        backgroundColor: log.status === 'Success' ? 'rgba(16, 185, 129, 0.1)' : log.status === 'Failed' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: log.status === 'Success' ? 'var(--success-color)' : log.status === 'Failed' ? 'var(--error-color)' : 'var(--accent-color)'
                      }}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', paddingTop: '1.25rem' }}>{log.time}</td>
                    <td style={{ padding: '1rem', width: '45%' }}>
                      {log.status === 'Failed' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--error-color)' }}>
                            {log.error}
                          </div>
                          
                          {!aiSuggestions[log.id] && analyzingId !== log.id && (
                            <button 
                              onClick={() => handleAnalyze(log.id, log.error)}
                              className="btn-primary ai-glow"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', width: 'fit-content' }}
                            >
                              ✨ Analyze with AI
                            </button>
                          )}

                          {(analyzingId === log.id || aiSuggestions[log.id]) && (
                            <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                              <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                                <span style={{ marginRight: '0.5rem' }}>✨</span>
                                {aiSuggestions[log.id] || "Analyzing..."}
                                {analyzingId === log.id && <span className="skeleton" style={{ display: 'inline-block', width: '8px', height: '14px', marginLeft: '4px', verticalAlign: 'middle', animation: 'fadeIn 0.5s infinite alternate' }}></span>}
                              </p>
                              
                              {aiSuggestions[log.id] && analyzingId !== log.id && (
                                <button 
                                  onClick={() => handleRetry(log.id)}
                                  className="btn-primary" 
                                  style={{ background: 'var(--success-color)', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                                >
                                  Auto-Heal & Retry
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {log.status === 'Success' && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', paddingTop: '0.25rem' }}>
                          Synced {log.records} records successfully.
                        </div>
                      )}
                      
                      {log.status === 'Syncing...' && (
                        <div style={{ color: 'var(--accent-color)', fontSize: '0.875rem', paddingTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: '50%' }}></div>
                          Applying fix and synchronizing...
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

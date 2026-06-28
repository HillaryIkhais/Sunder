'use client';
import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
              <div className="w-2 h-2 bg-background rounded-full" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Sunder</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        <div className="space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">Last updated: June 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">1. Data Interception & Processing</h2>
            <p>
              Sunder acts as a real-time data proxy. When we intercept webhooks or API payloads, we process the data entirely in-memory using AWS Aurora Serverless v2 and Node.js VM sandboxes. 
              We do not persist your raw PII (Personally Identifiable Information) or downstream payload contents to disk. Data is temporarily evaluated for schema drift using vector embeddings (pgvector) and immediately forwarded to your intended destination.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">2. Vector Embeddings & AI Models</h2>
            <p>
              Schema structures (keys, types, and hierarchical shapes) are converted into mathematical vector embeddings. These embeddings do not contain the actual values of your data (e.g., we embed the concept of a `customer_email` field, but not the email address itself). 
              Our drift detection relies exclusively on these structural embeddings to ensure Zero-Knowledge processing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">3. Enterprise Security (OIDC)</h2>
            <p>
              Sunder utilizes Zero-Secret architecture. We use OpenID Connect (OIDC) to authenticate with AWS via ephemeral, short-lived STS tokens. We never store permanent database credentials, meaning there is no centralized database URL that can be leaked or compromised.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">4. Compliance & SOC 2</h2>
            <p>
              This architecture is designed to support SOC 2 Type II, HIPAA, and GDPR compliance requirements out of the box by guaranteeing that intercepted data is never stored outside of your authorized VPC boundaries.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">5. Contact</h2>
            <p>
              For security disclosures or privacy inquiries, please contact our engineering team at <a href="mailto:security@sunder.dev" className="text-primary hover:underline">security@sunder.dev</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

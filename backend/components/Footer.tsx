'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks = {
  Product: ['How It Works', 'Integrations', 'Security', 'Changelog'],
  Enterprise: ['Custom Connectors', 'SLA Guarantees', 'Dedicated Support', 'SOC 2'],
  Developers: ['Documentation', 'API Reference', 'SDK', 'Status Page'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
}

export function Footer() {
  return (
    <footer className="relative border-t py-16 px-6" style={{ borderColor: 'rgba(0,220,255,0.08)', background: 'oklch(0.04 0 0)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
                <path d="M14 2L4 6v8c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V6L14 2z"
                  stroke="oklch(0.85 0.18 195)" strokeWidth="1.5" fill="rgba(0,220,255,0.06)" />
                <path d="M10 14l3 3 5-5" stroke="oklch(0.82 0.22 140)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-instrument-serif text-lg italic text-foreground">SUNDER</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed mb-6">
              Autonomous Data Immune System for enterprise pipelines.
            </p>
            {/* Live status */}
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="label-mono">ALL SYSTEMS NOMINAL</span>
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <h3 className="label-mono text-foreground/60 mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-foreground/40 hover:text-foreground/80 transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="label-mono">© 2025 SUNDER, INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            {['Twitter / X', 'LinkedIn', 'GitHub'].map((s) => (
              <a key={s} href="#" className="text-foreground/35 hover:text-foreground/70 transition-colors text-sm">
                {s}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

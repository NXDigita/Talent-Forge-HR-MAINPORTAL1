import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-white font-bold">TF</div>
          <div className="font-bold text-xl">TalentForge</div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
          <Link href="/dashboard" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Go to Dashboard</Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-28 px-6 text-center" style={{ background: 'linear-gradient(135deg, #FFF8F1 0%, #FDF6ED 45%, #FAF5E8 100%)' }}>
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
          {/* Warm glow orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #F6821F 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #FBBF24 0%, transparent 70%)' }} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/90 text-xs font-semibold px-4 py-1.5 rounded-full border shadow-sm" style={{ borderColor: '#E8D5B8', color: '#92400E' }}>
              🚀 India's #1 Engineering Talent Marketplace
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight" style={{ color: '#1A1F2E', lineHeight: 1.05 }}>
              Hire Engineers <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #F6821F 0%, #D97706 100%)', WebkitBackgroundClip: 'text' }}>
                Through Proof of Work
              </span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B5E4A' }}>
              Skip the resume. Discover engineers through verified simulations,
              real project scores, and blockchain-backed skill credentials.
              AI-matched hiring at ₹18K avg cost vs ₹40K traditional.
            </p>
            <div className="flex justify-center gap-4 pt-4 flex-wrap">
              <Link href="/talent" className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #F6821F, #E07315)' }}>
                Explore Talent Pool →
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base hover:-translate-y-0.5 transition-all bg-white shadow-sm" style={{ color: '#1A1F2E', border: '1px solid #E8D5B8' }}>
                ▶ Go to Dashboard
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="py-12 px-6 bg-white border-y">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">50M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide mt-1">Target Graduate Pool</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">2,500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide mt-1">Verified Candidates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500">500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide mt-1">Companies Hiring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-500">91.2%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide mt-1">Avg Match Quality</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

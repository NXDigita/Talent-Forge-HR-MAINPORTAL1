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
        <section className="relative overflow-hidden py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 40%, #FFF7ED 100%)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl mx-auto space-y-6">
            <div className="inline-block bg-white text-xs font-semibold px-3 py-1 rounded-full border shadow-sm">
              🚀 India's #1 Engineering Talent Marketplace
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
              Hire Engineers <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Through Proof of Work
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              An investor-demo-ready, premium enterprise SaaS platform where companies hire engineers based on verified simulation scores, blockchain credentials, and AI-powered matching — not resumes.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/talent" className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Explore Talent Pool →
              </Link>
              <button className="bg-white border text-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
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

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Sparkles, Star, ArrowRight } from "lucide-react";
import { CANDIDATES } from "../data/mockData";
import { AIMatchModal } from "../components/talent/AIMatchModal";

const RECOMMENDED = CANDIDATES.filter((c) => [94, 91, 88, 85].includes(c.aiMatch ?? 0)).slice(0, 4);

export function Dashboard() {
  const [aiMatchOpen, setAiMatchOpen] = useState(false);

  const tfesDistData = [
    { name: '60-70', count: 12 },
    { name: '70-80', count: 28 },
    { name: '80-90', count: 41 },
    { name: '90-100', count: 19 },
  ];

  const domainData = [
    { name: 'ECE', value: 28, color: '#3B82F6' },
    { name: 'Mech', value: 18, color: '#F97316' },
    { name: 'CS', value: 22, color: '#8B5CF6' },
    { name: 'EEE', value: 12, color: '#22C55E' },
    { name: 'DS', value: 20, color: '#14B8A6' },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Greeting card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl border shadow-lg relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FFF8F1 0%, #FEF3E2 100%)' }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Good morning, Rahul 👋</h1>
            <p className="text-gray-600 font-medium mb-6">
              You have <strong style={{ color: '#F6821F' }}>3 active projects</strong> · <strong className="text-amber-600">7 pending reviews</strong> · <strong className="text-green-600">2 payment approvals</strong> due
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setAiMatchOpen(true)}
                data-testid="btn-ai-match-dashboard"
                className="flex items-center gap-2 text-white px-5 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm" style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}
              >
                <Sparkles className="w-4 h-4" /> Run AI Match
              </button>
              <Link
                href="/pipeline"
                className="border border-gray-300 text-gray-700 px-5 py-3 rounded-xl font-bold hover:bg-white transition-colors bg-white/50 backdrop-blur-sm shadow-sm text-sm"
              >
                View Pipeline →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Hires", value: "3", sub: "Projects Running", trend: "↑ 2 from last month", trendUp: true, color: "text-blue-600" },
            { label: "Pending Reviews", value: "7", sub: "Awaiting Approval", trend: "Oldest: 3 days ago", trendUp: false, color: "text-amber-500" },
            { label: "Escrow Held", value: "₹85,000", sub: "In active escrow", trend: "3 milestones pending", trendUp: true, color: "text-green-600", mono: true },
            { label: "Avg TFES", value: "86", sub: "/100 avg hired", trend: "↑ 4pts vs last quarter", trendUp: true, color: "text-purple-600", mono: true }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              data-testid={`kpi-card-${i}`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity bg-current ${stat.color}`} />
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{stat.label}</div>
              <div className={`text-4xl font-black mb-1 tracking-tight ${stat.color} ${stat.mono ? 'font-mono' : ''}`}>{stat.value}</div>
              <div className="text-sm font-medium text-gray-900 mb-2">{stat.sub}</div>
              <div className={`text-xs font-bold ${stat.trendUp ? 'text-green-600' : 'text-amber-600'}`}>{stat.trend}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">TFES Score Distribution</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tfesDistData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <RechartsTooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Pipeline by Domain</h3>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={domainData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" animationDuration={800}>
                    {domainData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Recommended Candidates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}>
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900">AI Recommended for Your Active Project</h3>
            </div>
            <button
              onClick={() => setAiMatchOpen(true)}
              data-testid="btn-run-match-section"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all" style={{ color: '#F6821F', border: '1px solid rgba(246,130,31,0.3)' }}
            >
              <Sparkles className="w-3 h-3" /> Run AI Match
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
            {(RECOMMENDED.length > 0 ? RECOMMENDED : CANDIDATES.slice(0, 4)).map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex-shrink-0 w-52 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                data-testid={`recommended-card-${c.id}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ background: ['#8B5CF6','#3B82F6','#14B8A6','#F97316'][i % 4] }}>
                    {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-xs truncate">{c.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">{c.city}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="font-mono font-black text-purple-600 text-lg">{c.tfes}</span>
                  <span className="text-[10px] text-gray-400 font-medium">/100 TFES</span>
                </div>
                {c.aiMatch && (
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2" style={{ color: '#0F766E', background: '#CCFBF1', borderColor: '#5EEAD4' }}>
                    {c.aiMatch}% Match
                  </span>
                )}
                <div className="flex flex-wrap gap-1 mb-3">
                  {(c.skills || []).slice(0, 3).map((s) => (
                    <span key={s} className="text-[9px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <Link href={`/candidate/${c.id}`} className="flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                  View Profile <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pipeline Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-900">Hire Pipeline — Quick View</h3>
            <Link href="/pipeline" className="text-xs font-bold text-blue-600 hover:underline">Open Full Pipeline →</Link>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: "Invited", count: 8, color: "#3B82F6", bg: "#EFF6FF" },
              { label: "Applied", count: 5, color: "#F97316", bg: "#FFF7ED" },
              { label: "Reviewing", count: 7, color: "#8B5CF6", bg: "#F5F3FF" },
              { label: "Hired", count: 3, color: "#22C55E", bg: "#F0FDF4" },
              { label: "Complete", count: 12, color: "#14B8A6", bg: "#F0FDFA" },
            ].map((col) => (
              <div key={col.label} className="text-center">
                <div className="rounded-xl p-3 border mb-2" style={{ background: col.bg, borderColor: col.color + '30' }}>
                  <div className="font-black text-2xl" style={{ color: col.color }}>{col.count}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">{col.label}</div>
                </div>
                <div className="flex -space-x-1.5 justify-center">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white" style={{ background: col.color, opacity: 1 - j * 0.2 }}>
                      {String.fromCharCode(65 + j)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <Link href="/pipeline" className="text-sm text-primary font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[
              { icon: "✅", title: "Arjun K. submitted Milestone 2", sub: "ESP32 project", time: "2h ago" },
              { icon: "💳", title: "₹7,333 payment released to Priya S.", sub: "Python Pipeline M1", time: "5h ago" },
              { icon: "🆕", title: "8 new candidates matched", sub: "Firmware Project — via AI Match", time: "8h ago" },
              { icon: "⭐", title: "Vikram R. rated 4.9★", sub: "by reviewer Meena J.", time: "1d ago" },
              { icon: "📋", title: "New project \"CAD Assembly\" posted", sub: "SolidWorks · Mechanical", time: "1d ago" },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors" data-testid={`activity-${i}`}>
                <div className="text-xl bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">{act.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900">{act.title}</div>
                  <div className="text-xs text-gray-500">{act.sub}</div>
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase flex-shrink-0">{act.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIMatchModal open={aiMatchOpen} onClose={() => setAiMatchOpen(false)} />
    </>
  );
}

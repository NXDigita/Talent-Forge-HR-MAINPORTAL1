import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

export function Dashboard() {
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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-3xl border shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)' }}>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Good morning, Rahul 👋</h1>
          <p className="text-gray-600 font-medium mb-6">You have <strong className="text-blue-600">3 active projects</strong> · <strong className="text-amber-600">7 pending reviews</strong> · <strong className="text-green-600">2 payment approvals</strong> due</p>
          <div className="flex gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">+ Post New Project</button>
            <Link href="/pipeline" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors bg-white/50 backdrop-blur-sm shadow-sm">View Pipeline →</Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Hires", value: "3", sub: "Projects Running", trend: "↑ 2 from last month", trendUp: true, color: "text-blue-600" },
          { label: "Pending Reviews", value: "7", sub: "Awaiting Approval", trend: "Oldest: 3 days ago", trendUp: false, color: "text-amber-500" },
          { label: "Escrow Held", value: "₹85,000", sub: "In active escrow", trend: "3 milestones pending", trendUp: true, color: "text-green-600", mono: true },
          { label: "Avg TFES", value: "86", sub: "/100 avg hired", trend: "↑ 4pts vs last quarter", trendUp: true, color: "text-purple-600", mono: true }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity bg-current ${stat.color}`}></div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{stat.label}</div>
            <div className={`text-4xl font-black mb-1 tracking-tight ${stat.color} ${stat.mono ? 'font-mono' : ''}`}>{stat.value}</div>
            <div className="text-sm font-medium text-gray-900 mb-2">{stat.sub}</div>
            <div className={`text-xs font-bold ${stat.trendUp ? 'text-green-600' : 'text-amber-600'}`}>{stat.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">TFES Score Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tfesDistData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
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
      
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <Link href="/pipeline" className="text-sm text-primary font-bold hover:underline">View All</Link>
        </div>
        <div className="space-y-4">
          {[
            { icon: "✅", title: "Arjun K. submitted Milestone 2", sub: "ESP32 project", time: "2h ago" },
            { icon: "💳", title: "₹7,333 payment released to Priya S.", sub: "Python Pipeline M1", time: "5h ago" },
            { icon: "🆕", title: "8 new candidates matched", sub: "Firmware Project", time: "8h ago" },
            { icon: "⭐", title: "Vikram R. rated 4.9★", sub: "by reviewer Meena J.", time: "1d ago" },
          ].map((act, i) => (
            <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-xl bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">{act.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-sm text-gray-900">{act.title}</div>
                <div className="text-xs text-gray-500">{act.sub}</div>
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase">{act.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

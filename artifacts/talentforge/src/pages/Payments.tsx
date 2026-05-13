import React from "react";
import { PAYMENTS, SPEND_DATA, PROJECTS, CANDIDATES } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Payments() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Escrow & Payments</h1>
          <p className="text-muted-foreground mt-1">Milestone-based payouts protected by Polygon blockchain</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 font-medium text-sm shadow-sm">
          <ShieldCheck className="w-4 h-4" /> Escrow Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Spent", value: "₹3,24,000", sub: "18 projects", color: "text-gray-900" },
          { label: "Escrow Held", value: "₹85,000", sub: "3 active holds", color: "text-blue-600" },
          { label: "Avg Per Hire", value: "₹18,000", sub: "vs ₹40K industry", color: "text-purple-600" },
          { label: "Savings", value: "₹1,80,000", sub: "60% cost reduction", color: "text-green-600" }
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-5 rounded-2xl border shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{kpi.label}</div>
            <div className={`text-3xl font-bold font-mono ${kpi.color} mb-1`}>{kpi.value}</div>
            <div className="text-sm font-medium text-gray-500">{kpi.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">Monthly Spend vs Industry Average</h3>
          <select className="border rounded-md text-sm px-3 py-1.5 bg-gray-50 font-medium text-gray-700 outline-none">
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SPEND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
              <RechartsTooltip cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '14px', fontWeight: 500 }} />
              <Area type="monotone" dataKey="spend" name="Our Spend" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="industry" name="Industry Avg" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-gray-900">Active Escrow Wallet</h3>
              <p className="text-sm text-gray-500 mt-1">Funds held securely until milestones are approved</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total Held</div>
              <div className="font-mono text-xl font-bold text-blue-600">₹85,000</div>
            </div>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {PROJECTS.filter(p => p.escrow && p.escrow.held > 0).map(p => (
              <div key={p.id} className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:border-blue-200 transition-colors">
                <div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{p.title}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="font-medium text-gray-700">{CANDIDATES.find(c=>c.id===p.assignedTo)?.name || 'Candidate'}</span>
                    <span>•</span>
                    <span>Milestone {p.escrow?.milestone}/{p.escrow?.of}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono font-bold text-green-600 text-sm">₹{p.escrow?.held.toLocaleString()}</div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold mt-0.5">Ready to Release</div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transition-colors">Release</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg text-gray-900">Recent Payouts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Project/Candidate</th>
                  <th className="px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PAYMENTS.slice(0, 5).map((pay, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{pay.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{pay.project}</div>
                      <div className="text-xs text-gray-500">{pay.candidate} • {pay.type}</div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-green-600">₹{pay.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                      </span>
                      <div className="text-[10px] font-mono text-gray-400 mt-1 ml-1">{pay.hash}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

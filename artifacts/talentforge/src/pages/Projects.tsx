import React from "react";
import { PROJECTS } from "@/data/mockData";
import { motion } from "framer-motion";
import { FolderOpen, Clock, Users, ShieldCheck } from "lucide-react";

export function Projects() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Manager</h1>
          <p className="text-muted-foreground mt-1">Manage all your active and past engineering projects</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: "6", icon: FolderOpen },
          { label: "Active", value: "3", icon: Clock },
          { label: "In Review", value: "1", icon: Users },
          { label: "Completed", value: "1", icon: ShieldCheck }
        ].map((stat, i) => (
          <div key={i} className="bg-white border p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            {project.stage === 'complete' && <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-4 -right-4 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-8 rotate-45 transform origin-center shadow-sm">Done</div>
            </div>}
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded mb-3">{project.domain}</span>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 pr-8">{project.title}</h3>
                <div className="text-sm text-gray-500 capitalize">{project.stage} stage • {project.tier} required</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <div className="text-xs text-gray-500 mb-1 uppercase font-semibold">Budget</div>
                <div className="font-mono text-green-600 font-bold text-lg">₹{project.budget.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 uppercase font-semibold">Timeline</div>
                <div className="text-sm font-medium text-gray-900">{project.daysLeft > 0 ? `${project.daysLeft} days left` : 'Completed'}</div>
              </div>
            </div>

            {project.escrow && (
              <div className="mb-6">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-gray-500">Escrow Milestone {project.escrow.milestone}/{project.escrow.of}</span>
                  <span className="font-mono text-blue-600 font-bold">₹{project.escrow.released.toLocaleString()} released</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(project.escrow.released / project.escrow.total) * 100}%` }}></div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">View Details</button>
              {project.stage !== 'complete' && <button className="flex-1 bg-primary text-white font-medium py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors shadow-sm">Manage Team</button>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

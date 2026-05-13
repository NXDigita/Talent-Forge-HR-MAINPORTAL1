import React, { useState } from "react";
import { PROJECTS, CANDIDATES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Pipeline() {
  const [view, setView] = useState<"list" | "kanban">("kanban");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const stages = [
    { id: "posted", label: "Posted", count: 4, color: "bg-gray-100 text-gray-700" },
    { id: "hiring", label: "AI Matched", count: 12, color: "bg-teal-100 text-teal-700" },
    { id: "invited", label: "Invited", count: 8, color: "bg-blue-100 text-blue-700" },
    { id: "applied", label: "Applied", count: 5, color: "bg-purple-100 text-purple-700" },
    { id: "reviewing", label: "Reviewing", count: 7, color: "bg-amber-100 text-amber-700" },
    { id: "working", label: "Working", count: 3, color: "bg-green-100 text-green-700" },
    { id: "complete", label: "Done", count: 12, color: "bg-gray-800 text-white" }
  ];

  const kanbanStages = ["posted", "reviewing", "hiring", "working", "complete"];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hire Pipeline</h1>
        <div className="flex items-center gap-4 bg-white p-1 rounded-lg border shadow-sm">
          <button onClick={() => setView("kanban")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "kanban" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}>Kanban</button>
          <button onClick={() => setView("list")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "list" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}>List View</button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap hover:-translate-y-0.5 transition-transform bg-white`}>
              {stage.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${stage.color}`}>{stage.count}</span>
            </button>
            {i < stages.length - 1 && <span className="text-gray-300">→</span>}
          </React.Fragment>
        ))}
      </div>

      {view === "kanban" ? (
        <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[500px]">
          {kanbanStages.map(stage => (
            <div key={stage} className="bg-gray-50 rounded-xl border border-gray-200 p-4 w-[300px] shrink-0">
              <h3 className="font-bold text-gray-700 capitalize mb-4 flex justify-between items-center">
                {stage} <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs">{PROJECTS.filter(p => p.stage === stage).length}</span>
              </h3>
              <div className="space-y-3">
                {PROJECTS.filter(p => p.stage === stage).map(project => (
                  <motion.div layoutId={project.id} key={project.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedProject(project.id)}>
                    <div className="text-xs font-bold inline-block px-2 py-1 rounded mb-2 uppercase tracking-wide" style={{ color: '#C2600A', background: 'rgba(246,130,31,0.1)' }}>{project.domain}</div>
                    <h4 className="font-bold text-gray-900 mb-2 leading-tight">{project.title}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-green-600 font-bold">₹{project.budget.toLocaleString()}</span>
                      <span className="text-gray-500">{project.daysLeft}d left</span>
                    </div>
                    {project.applicants > 0 && (
                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <span className="text-xs text-gray-500">{project.applicants} applicants</span>
                        <div className="flex -space-x-2">
                          {[1,2,3].slice(0, Math.min(project.applicants, 3)).map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Project</th>
                <th className="p-4 font-semibold text-gray-600">Budget</th>
                <th className="p-4 font-semibold text-gray-600">Applicants</th>
                <th className="p-4 font-semibold text-gray-600">Stage</th>
                <th className="p-4 font-semibold text-gray-600">Due</th>
                <th className="p-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(project => (
                <tr key={project.id} className="border-b hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedProject(project.id)}>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{project.title}</div>
                    <div className="text-xs text-gray-500">{project.domain}</div>
                  </td>
                  <td className="p-4 font-mono text-green-600 font-bold">₹{project.budget.toLocaleString()}</td>
                  <td className="p-4">{project.applicants}</td>
                  <td className="p-4">
                    <span className="capitalize px-2 py-1 rounded bg-gray-100 text-xs font-bold text-gray-700">{project.stage}</span>
                  </td>
                  <td className="p-4 text-gray-500">{project.daysLeft}d</td>
                  <td className="p-4">
                    <button className="text-primary font-medium hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-over panel simulation */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={(o) => !o && setSelectedProject(null)}>
            <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0">
              <div className="p-6 border-b bg-gray-50 rounded-t-xl">
                <DialogTitle className="text-xl">Applications — {PROJECTS.find(p=>p.id === selectedProject)?.title}</DialogTitle>
                <div className="text-sm text-gray-500 mt-1">Review top AI-matched candidates</div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {CANDIDATES.slice(0, 4).map(c => (
                  <div key={c.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">{c.name.split(' ').map(n=>n[0]).join('')}</div>
                       <div>
                         <div className="font-bold text-gray-900">{c.name}</div>
                         <div className="text-xs text-gray-500">{c.domain} · TFES {c.tfes}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded uppercase tracking-wide block">{c.aiMatch}% Match</div>
                      <button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">View</button>
                      <button className="px-3 py-1.5 bg-green-500 text-white rounded text-sm font-bold hover:bg-green-600">Accept</button>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

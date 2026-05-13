import React, { useState } from "react";
import { PROJECTS } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Clock, Users, ShieldCheck, Plus } from "lucide-react";
import { PostProjectModal, type NewProject } from "@/components/projects/PostProjectModal";

type Project = typeof PROJECTS[number] & Partial<NewProject>;

export function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [extraProjects, setExtraProjects] = useState<NewProject[]>([]);

  const allProjects: Project[] = [...PROJECTS, ...extraProjects];

  const stats = [
    { label: "Total Projects", value: allProjects.length, icon: FolderOpen },
    { label: "Active", value: allProjects.filter(p => ["working", "hiring", "reviewing"].includes(p.stage)).length, icon: Clock },
    { label: "In Review", value: allProjects.filter(p => p.stage === "reviewing").length, icon: Users },
    { label: "Completed", value: allProjects.filter(p => p.stage === "complete").length, icon: ShieldCheck },
  ];

  function handlePost(project: NewProject) {
    setExtraProjects(prev => [project, ...prev]);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Manager</h1>
          <p className="text-muted-foreground mt-1">Manage all your active and past engineering projects</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            layout
            className="bg-white border p-4 rounded-xl shadow-sm flex items-center gap-4"
          >
            <div className="p-3 rounded-lg" style={{ background: "rgba(246,130,31,0.1)", color: "#F6821F" }}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <motion.div
                key={stat.value}
                initial={{ scale: 1.3, color: "#F6821F" }}
                animate={{ scale: 1, color: "#111827" }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold"
              >
                {stat.value}
              </motion.div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {allProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: extraProjects.find(p => p.id === project.id) ? 0 : i * 0.07, duration: 0.3 }}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              style={extraProjects.find(p => p.id === project.id)
                ? { borderColor: "rgba(246,130,31,0.4)", boxShadow: "0 0 0 2px rgba(246,130,31,0.15), 0 4px 16px rgba(0,0,0,0.06)" }
                : {}}
            >
              {/* New badge for freshly posted projects */}
              {extraProjects.find(p => p.id === project.id) && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white animate-pulse"
                    style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                    NEW
                  </span>
                </div>
              )}

              {project.stage === "complete" && (
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-4 -right-4 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-8 rotate-45 transform origin-center shadow-sm">Done</div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="pr-8 min-w-0">
                  <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded mb-3"
                    style={{ background: "rgba(246,130,31,0.1)", color: "#C2600A" }}>
                    {project.domain}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{project.title}</h3>
                  {"description" in project && project.description && (
                    <p className="text-xs text-gray-400 mb-1 line-clamp-1">{project.description}</p>
                  )}
                  <div className="text-sm text-gray-500 capitalize">{project.stage} stage • {project.tier} required</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 mb-1 uppercase font-semibold">Budget</div>
                  <div className="font-mono text-green-600 font-bold text-lg">₹{project.budget.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1 uppercase font-semibold">Timeline</div>
                  <div className="text-sm font-medium text-gray-900">
                    {project.daysLeft > 0 ? `${project.daysLeft} days left` : "Completed"}
                  </div>
                </div>
              </div>

              {project.escrow && (
                <div className="mb-5">
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-gray-500">
                      Escrow Milestone {project.escrow.milestone}/{project.escrow.of}
                    </span>
                    <span className="font-mono font-bold" style={{ color: "#F6821F" }}>
                      ₹{project.escrow.released.toLocaleString()} released
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.escrow.total > 0 ? (project.escrow.released / project.escrow.total) * 100 : 0}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-2 rounded-full"
                      style={{ background: "linear-gradient(90deg, #F6821F, #D97706)" }}
                    />
                  </div>
                </div>
              )}

              {/* Milestone preview for new projects */}
              {"milestones" in project && project.milestones && project.escrow?.released === 0 && (
                <div className="mb-5 space-y-1.5">
                  {project.milestones.map((m, mi) => (
                    <div key={mi} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                        <span className="text-gray-500 font-medium">{m.label}</span>
                      </div>
                      <span className="font-mono text-gray-400">{m.pct}%</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  View Details
                </button>
                {project.stage !== "complete" && (
                  <button
                    className="flex-1 text-white font-medium py-2 rounded-lg text-sm transition-colors shadow-sm"
                    style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}
                  >
                    {project.stage === "posted" ? "Find Engineers" : "Manage Team"}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty-state placeholder when no projects */}
        {allProjects.length === 0 && (
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-20 text-center">
            <FolderOpen className="w-12 h-12 text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No projects yet. Post your first one!</p>
          </div>
        )}
      </div>

      <PostProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onPost={handlePost}
      />
    </div>
  );
}

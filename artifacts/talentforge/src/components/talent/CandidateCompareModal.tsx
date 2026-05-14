import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Star, CheckCircle2, Zap } from "lucide-react";
import { Link } from "wouter";

type Candidate = {
  id: string;
  name: string;
  city: string;
  domain: string;
  tier: string;
  tfes: number;
  simulations: { id: string; project: string; domain: string; score: number; result: string; date: string; status: string; }[];
  projects: number;
  badges: { name: string; score: number; hash: string; }[];
  earned: number;
  rating: number;
  available: boolean;
  aiMatch?: number;
  skills: string[];
  scores: { technical: number; domain: number; problem: number; comms: number; collab: number; consistency: number };
};

const SCORE_LABELS: Record<string, string> = {
  technical: "Technical",
  domain: "Domain",
  problem: "Problem Solving",
  comms: "Communication",
  collab: "Collaboration",
  consistency: "Consistency",
};

const TIER_ORDER: Record<string, number> = { Apprentice: 1, Practitioner: 2, Expert: 3, Master: 4 };

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

function ScoreBar({ value, max = 100, highlight }: { value: number; max?: number; highlight: boolean }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: highlight ? "linear-gradient(90deg, #F6821F, #D97706)" : "#CBD5E1" }}
        />
      </div>
      <span className="text-xs font-mono font-bold w-7 text-right" style={{ color: highlight ? "#F6821F" : "#64748B" }}>
        {value}
      </span>
    </div>
  );
}

interface Props {
  candidates: Candidate[];
  open: boolean;
  onClose: () => void;
}

export function CandidateCompareModal({ candidates, open, onClose }: Props) {
  if (!open || candidates.length < 2) return null;

  const scoreKeys = ["technical", "domain", "problem", "comms", "collab", "consistency"] as const;

  const allSkills = Array.from(new Set(candidates.flatMap((c) => c.skills)));
  const sharedSkills = allSkills.filter((s) => candidates.every((c) => c.skills.includes(s)));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(15,20,35,0.7)", backdropFilter: "blur(6px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Candidate Comparison</div>
                <div className="text-[11px] text-gray-400">{candidates.length} candidates selected</div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {/* Candidate headers */}
            <div
              className="grid gap-0 sticky top-0 z-10 border-b border-gray-100"
              style={{ gridTemplateColumns: `180px repeat(${candidates.length}, 1fr)`, background: "linear-gradient(135deg, #FFF8F1, #FEF3E2)" }}
            >
              <div className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-end">Metric</div>
              {candidates.map((c) => (
                <div key={c.id} className="px-4 py-4 flex flex-col items-center text-center border-l border-orange-100">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg text-white mb-2 shadow-sm"
                    style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                    {initials(c.name)}
                  </div>
                  <div className="font-bold text-gray-900 text-sm leading-tight">{c.name}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{c.city} · {c.domain}</div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap justify-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{ background: "rgba(246,130,31,0.12)", color: "#C2600A" }}>{c.tier}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {c.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* TFES Score */}
            <div className="grid border-b border-gray-50 bg-white hover:bg-gray-50/50 transition-colors"
              style={{ gridTemplateColumns: `180px repeat(${candidates.length}, 1fr)` }}>
              <div className="px-4 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center">TFES Score</div>
              {candidates.map((c, ci) => {
                const best = Math.max(...candidates.map((x) => x.tfes));
                const isBest = c.tfes === best;
                return (
                  <div key={c.id} className="px-4 py-5 flex flex-col items-center border-l border-gray-50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold font-mono" style={{ color: isBest ? "#F6821F" : "#374151" }}>{c.tfes}</span>
                      <span className="text-sm text-gray-400">/100</span>
                    </div>
                    {isBest && <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-1">Highest</span>}
                    <div className="w-full mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${c.tfes}%` }} transition={{ duration: 0.7, delay: ci * 0.1 }}
                        className="h-full rounded-full" style={{ background: isBest ? "linear-gradient(90deg, #F6821F, #D97706)" : "#CBD5E1" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Match */}
            {candidates.some(c => c.aiMatch) && (
              <div className="grid border-b border-gray-50 bg-white hover:bg-gray-50/50 transition-colors"
                style={{ gridTemplateColumns: `180px repeat(${candidates.length}, 1fr)` }}>
                <div className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center">AI Match %</div>
                {candidates.map((c) => {
                  const best = Math.max(...candidates.map((x) => x.aiMatch ?? 0));
                  const isBest = (c.aiMatch ?? 0) === best;
                  return (
                    <div key={c.id} className="px-4 py-4 flex items-center justify-center border-l border-gray-50">
                      {c.aiMatch ? (
                        <span className="text-sm font-bold px-3 py-1 rounded-lg" style={isBest
                          ? { background: "rgba(20,184,166,0.12)", color: "#0F766E" }
                          : { background: "#F1F5F9", color: "#64748B" }}>
                          {c.aiMatch}% match
                        </span>
                      ) : <span className="text-gray-300 text-sm">—</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Score Breakdown */}
            <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: `180px repeat(${candidates.length}, 1fr)` }}>
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Score Breakdown</span>
              </div>
              {candidates.map((c) => (
                <div key={c.id} className="px-4 py-3 bg-gray-50 border-l border-b border-gray-100" />
              ))}
              {scoreKeys.map((key) => {
                const vals = candidates.map((c) => c.scores[key]);
                const best = Math.max(...vals);
                return (
                  <React.Fragment key={key}>
                    <div className="px-4 py-3 text-xs font-medium text-gray-500 flex items-center border-b border-gray-50">{SCORE_LABELS[key]}</div>
                    {candidates.map((c) => (
                      <div key={c.id} className="px-4 py-3 border-l border-b border-gray-50 flex items-center">
                        <div className="w-full">
                          <ScoreBar value={c.scores[key]} highlight={c.scores[key] === best} />
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Stats */}
            {[
              { label: "Simulations", key: "simulations" as const, format: (v: number) => String(v) },
              { label: "Projects Done", key: "projects" as const, format: (v: number) => String(v) },
              { label: "Total Earned", key: "earned" as const, format: (v: number) => `₹${v.toLocaleString()}` },
              { label: "Rating", key: "rating" as const, format: (v: number) => `${v} ★` },
              { label: "Badges", key: "badges" as const, format: (v: number) => String(v) },
            ].map(({ label, key, format }) => {
              const vals = candidates.map((c) => c[key] as number);
              const best = Math.max(...vals);
              return (
                <div key={key} className="grid border-b border-gray-50 bg-white hover:bg-gray-50/50 transition-colors"
                  style={{ gridTemplateColumns: `180px repeat(${candidates.length}, 1fr)` }}>
                  <div className="px-4 py-3.5 text-xs font-medium text-gray-500 flex items-center">{label}</div>
                  {candidates.map((c) => {
                    const val = c[key] as number;
                    const isBest = val === best;
                    return (
                      <div key={c.id} className="px-4 py-3.5 border-l border-gray-50 flex items-center justify-center">
                        <span className="text-sm font-bold font-mono" style={{ color: isBest ? "#F6821F" : "#374151" }}>
                          {format(val)}
                          {isBest && <span className="ml-1.5 text-[10px] font-bold text-orange-400">▲</span>}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Skills */}
            <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: `180px repeat(${candidates.length}, 1fr)` }}>
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Skills</span>
                {sharedSkills.length > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(246,130,31,0.12)", color: "#C2600A" }}>
                    {sharedSkills.length} shared
                  </span>
                )}
              </div>
              {candidates.map((c) => (
                <div key={c.id} className="px-4 py-3 bg-gray-50 border-l border-b border-gray-100" />
              ))}
              <div className="px-4 py-4 text-xs text-gray-400 flex items-start pt-3">
                <span className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#F6821F" }} /> Shared
                </span>
              </div>
              {candidates.map((c) => (
                <div key={c.id} className="px-4 py-4 border-l border-gray-50 flex flex-wrap gap-1.5">
                  {c.skills.map((skill) => {
                    const shared = sharedSkills.includes(skill);
                    return (
                      <span key={skill} className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                        style={shared
                          ? { background: "rgba(246,130,31,0.12)", color: "#C2600A", border: "1px solid rgba(246,130,31,0.25)" }
                          : { background: "#F1F5F9", color: "#475569" }}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-4">
            <p className="text-[11px] text-gray-400 font-medium">
              {sharedSkills.length > 0
                ? `Shared skills: ${sharedSkills.slice(0, 4).join(", ")}${sharedSkills.length > 4 ? ` +${sharedSkills.length - 4}` : ""}`
                : "No overlapping skills between selected candidates."}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-white transition-colors">
                Close
              </button>
              <div className="flex gap-2">
                {candidates.map((c) => (
                  <Link key={c.id} href={`/candidate/${c.id}`}>
                    <button onClick={onClose} className="text-sm font-bold px-4 py-2 rounded-xl text-white transition-all hover:shadow-md"
                      style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                      {initials(c.name)} Profile →
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

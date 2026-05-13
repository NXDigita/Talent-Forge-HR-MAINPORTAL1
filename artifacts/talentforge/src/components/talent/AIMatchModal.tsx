import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronRight, Check, AlertCircle, Star, Zap, ArrowRight, Plus } from "lucide-react";
import { CANDIDATES } from "../../data/mockData";
import { useLocation } from "wouter";

const DOMAINS = ["ECE", "EEE", "Mechanical", "CS", "Data Science", "AI/ML", "Robotics", "Embedded", "Cloud", "Civil"];
const TIERS = ["Apprentice", "Practitioner", "Expert", "Master"];
const TIER_RANK: Record<string, number> = { Apprentice: 1, Practitioner: 2, Expert: 3, Master: 4 };

const SKILL_SUGGESTIONS: Record<string, string[]> = {
  ECE: ["STM32", "ESP32", "FreeRTOS", "ARM Cortex", "UART", "SPI", "I2C", "Circuit Design"],
  EEE: ["Load Flow", "ETAP", "SCADA", "PLC", "MATLAB", "Relay Coordination"],
  Mechanical: ["SolidWorks", "ANSYS", "AutoCAD", "CATIA", "FEA", "GD&T"],
  CS: ["React", "Node.js", "PostgreSQL", "Docker", "TypeScript", "REST"],
  "Data Science": ["Python", "TensorFlow", "SQL", "Pandas", "XGBoost", "BERT"],
  "AI/ML": ["PyTorch", "TensorFlow", "CUDA", "LLM", "RAG", "MLflow"],
  Robotics: ["ROS2", "Python", "OpenCV", "SLAM", "Gazebo", "C++"],
  Embedded: ["STM32", "FreeRTOS", "ARM", "C", "UART", "Bare-metal"],
  Cloud: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Docker", "Prometheus"],
  Civil: ["AutoCAD", "STAAD Pro", "ETABS", "SAP2000"],
};

interface MatchResult {
  candidate: (typeof CANDIDATES)[0];
  overallFit: number;
  tfesScore: number;
  domainScore: number;
  skillScore: number;
  tierScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string;
}

function computeMatch(
  candidate: (typeof CANDIDATES)[0],
  domain: string,
  skills: string[],
  minTfes: number,
  requiredTier: string
): MatchResult {
  const domainScore =
    candidate.domain === domain ||
    candidate.specialization?.toLowerCase().includes(domain.toLowerCase()) ||
    domain.toLowerCase().includes(candidate.domain.toLowerCase())
      ? 100
      : candidate.domain === "ECE" && domain === "Embedded"
      ? 85
      : 30;

  const tfesScore = Math.min(100, Math.round(((candidate.tfes - 60) / 40) * 100));

  const candidateSkillsLower = (candidate.skills || []).map((s) => s.toLowerCase());
  const matchedSkills = skills.filter((s) =>
    candidateSkillsLower.some((cs) => cs.includes(s.toLowerCase()) || s.toLowerCase().includes(cs))
  );
  const missingSkills = skills.filter((s) => !matchedSkills.includes(s));
  const skillScore = skills.length > 0 ? Math.round((matchedSkills.length / skills.length) * 100) : 80;

  const candidateTierRank = TIER_RANK[candidate.tier] || 2;
  const requiredTierRank = TIER_RANK[requiredTier] || 2;
  const tierScore = candidateTierRank >= requiredTierRank ? 100 : Math.round((candidateTierRank / requiredTierRank) * 80);

  const tfesGap = candidate.tfes < minTfes ? Math.max(0, 1 - (minTfes - candidate.tfes) / 20) : 1;
  const ratingBonus = ((candidate.rating || 4.5) / 5) * 10;

  const overallFit = Math.min(
    99,
    Math.round(
      domainScore * 0.3 + tfesScore * 0.25 + skillScore * 0.3 + tierScore * 0.1 + ratingBonus
    ) * tfesGap
  );

  const explanations = [];
  if (domainScore >= 90) explanations.push(`Strong ${domain} domain alignment`);
  else if (domainScore >= 60) explanations.push(`Partial domain match via ${candidate.specialization}`);
  else explanations.push(`Adjacent domain (${candidate.domain})`);
  if (candidate.tfes >= 85) explanations.push(`high TFES ${candidate.tfes}`);
  if (matchedSkills.length > 0) explanations.push(`${matchedSkills.length}/${skills.length} required skills matched`);

  return {
    candidate,
    overallFit,
    tfesScore,
    domainScore,
    skillScore,
    tierScore,
    matchedSkills,
    missingSkills,
    explanation: explanations.join(" · "),
  };
}

function FitBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

function AvatarCircle({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#8B5CF6", "#3B82F6", "#14B8A6", "#F97316", "#22C55E", "#F43F5E"];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

function FitBadge({ pct }: { pct: number }) {
  const color = pct >= 90 ? "#0F766E" : pct >= 75 ? "#1D4ED8" : pct >= 60 ? "#92400E" : "#6B7280";
  const bg = pct >= 90 ? "#CCFBF1" : pct >= 75 ? "#DBEAFE" : pct >= 60 ? "#FEF3C7" : "#F3F4F6";
  const border = pct >= 90 ? "#5EEAD4" : pct >= 75 ? "#93C5FD" : pct >= 60 ? "#FCD34D" : "#E5E7EB";
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border"
      style={{ color, background: bg, borderColor: border }}
    >
      {pct}% Match
    </span>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "analyzing" | "results";

const ANALYSIS_STEPS = [
  "Parsing project requirements...",
  "Scanning 2,500+ candidate profiles...",
  "Evaluating TFES score compatibility...",
  "Cross-referencing skill matrices...",
  "Running domain alignment checks...",
  "Scoring tier & availability fit...",
  "Ranking by composite fit score...",
  "Match complete. Generating report...",
];

export function AIMatchModal({ open, onClose }: Props) {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<Step>("form");
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("ECE");
  const [requiredTier, setRequiredTier] = useState("Practitioner");
  const [minTfes, setMinTfes] = useState(75);
  const [budget, setBudget] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["STM32", "FreeRTOS"]);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [invitedIds, setInvitedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("form");
        setAnalysisStep(0);
        setResults([]);
        setInvitedIds(new Set());
        setSelectedResult(null);
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "analyzing") return;
    setAnalysisStep(0);
    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= ANALYSIS_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            const computed = CANDIDATES.map((c) => computeMatch(c, domain, skills, minTfes, requiredTier))
              .sort((a, b) => b.overallFit - a.overallFit)
              .slice(0, 6);
            setResults(computed);
            setStep("results");
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 340);
    return () => clearInterval(interval);
  }, [step, domain, skills, minTfes, requiredTier]);

  function addSkill(s: string) {
    const trimmed = s.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  }

  function removeSkill(s: string) {
    setSkills((prev) => prev.filter((x) => x !== s));
  }

  function handleRunMatch() {
    if (!title.trim()) return;
    setStep("analyzing");
  }

  function handleInvite(id: string) {
    setInvitedIds((prev) => new Set([...prev, id]));
  }

  const suggestions = (SKILL_SUGGESTIONS[domain] || []).filter(
    (s) => !skills.includes(s) && s.toLowerCase().includes(skillInput.toLowerCase())
  );

  const progress = ((analysisStep + 1) / ANALYSIS_STEPS.length) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(17,24,39,0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
            style={{ border: "1px solid rgba(255,255,255,0.6)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">AI Candidate Match Engine</div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">
                    {step === "form" ? "Define Requirements" : step === "analyzing" ? "Analyzing Pool..." : `${results.length} Candidates Ranked`}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                data-testid="btn-close-ai-modal"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Step indicator */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              {(["form", "analyzing", "results"] as Step[]).map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${step === s ? "text-purple-600" : (["form", "analyzing", "results"].indexOf(step) > i ? "text-green-600" : "text-gray-400")}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${step === s ? "bg-purple-600 border-purple-600 text-white" : (["form", "analyzing", "results"].indexOf(step) > i ? "bg-green-500 border-green-500 text-white" : "border-gray-300 text-gray-400")}`}>
                      {["form", "analyzing", "results"].indexOf(step) > i ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    {s === "form" ? "Requirements" : s === "analyzing" ? "Analysis" : "Results"}
                  </div>
                  {i < 2 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                </React.Fragment>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <motion.div key="form" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="p-6 space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Project Title *</label>
                      <input
                        data-testid="input-project-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. ESP32 IoT Dashboard for Factory Floor"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-gray-400 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Engineering Domain</label>
                        <select
                          data-testid="select-domain"
                          value={domain}
                          onChange={(e) => {
                            setDomain(e.target.value);
                            setSkills([]);
                          }}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                        >
                          {DOMAINS.map((d) => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Required Tier</label>
                        <select
                          data-testid="select-tier"
                          value={requiredTier}
                          onChange={(e) => setRequiredTier(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                        >
                          {TIERS.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Budget (₹)</label>
                        <input
                          data-testid="input-budget"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="e.g. 25,000"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-400 placeholder:font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          Min TFES Score: <span className="font-mono text-purple-600">{minTfes}</span>
                        </label>
                        <input
                          data-testid="slider-min-tfes"
                          type="range" min={60} max={95} value={minTfes}
                          onChange={(e) => setMinTfes(Number(e.target.value))}
                          className="w-full accent-purple-600 mt-2"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
                          <span>60</span><span>95</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Required Skills</label>
                      <div className="min-h-[44px] px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 flex flex-wrap gap-1.5 items-center focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent transition-all">
                        {skills.map((s) => (
                          <span key={s} className="flex items-center gap-1 bg-purple-100 text-purple-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                            {s}
                            <button onClick={() => removeSkill(s)} className="hover:text-purple-900 transition-colors" data-testid={`btn-remove-skill-${s}`}>
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        <input
                          ref={inputRef}
                          data-testid="input-skills"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(skillInput); } if (e.key === "Backspace" && !skillInput && skills.length) removeSkill(skills[skills.length - 1]); }}
                          placeholder={skills.length ? "" : "Type a skill and press Enter..."}
                          className="flex-1 min-w-[120px] bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 font-medium"
                        />
                      </div>
                      {skillInput && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                          {suggestions.slice(0, 5).map((s) => (
                            <button key={s} onMouseDown={() => addSkill(s)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center gap-2" data-testid={`btn-suggest-skill-${s}`}>
                              <Plus className="w-3 h-3" /> {s}
                            </button>
                          ))}
                        </div>
                      )}
                      {!skillInput && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {(SKILL_SUGGESTIONS[domain] || []).filter((s) => !skills.includes(s)).slice(0, 6).map((s) => (
                            <button key={s} onClick={() => addSkill(s)} className="text-[10px] font-bold text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all" data-testid={`btn-quick-add-${s}`}>
                              + {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === "analyzing" && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 flex flex-col items-center justify-center min-h-[340px] gap-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 rounded-full border-4 border-purple-100 border-t-purple-500"
                    />
                    <div className="text-center space-y-2">
                      <div className="font-bold text-gray-900 text-base">AI Matching in Progress</div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={analysisStep}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="text-sm text-purple-600 font-semibold"
                        >
                          {ANALYSIS_STEPS[Math.min(analysisStep, ANALYSIS_STEPS.length - 1)]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="w-full max-w-xs">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                      <div className="text-right mt-1 text-[11px] font-bold text-gray-400">{Math.round(progress)}%</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 w-full max-w-xs text-center">
                      {[{ label: "Profiles Scanned", val: "2,543" }, { label: "Avg TFES", val: "81.4" }, { label: "Domains", val: "10" }].map((s) => (
                        <div key={s.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="font-mono text-purple-600 font-bold text-lg">{s.val}</div>
                          <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "results" && (
                  <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="divide-y divide-gray-50">
                    <div className="px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-between">
                      <div className="text-xs font-bold text-gray-600">
                        Matching <span className="text-purple-700">"{title}"</span> — <span className="font-mono text-purple-600">{domain}</span> · Min TFES <span className="font-mono">{minTfes}</span> · {requiredTier}+
                      </div>
                      <button onClick={() => setStep("form")} className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors">
                        Edit requirements
                      </button>
                    </div>

                    {results.map((r, i) => {
                      const isInvited = invitedIds.has(r.candidate.id);
                      const isExpanded = selectedResult === r.candidate.id;
                      const fitColor = r.overallFit >= 90 ? "#14B8A6" : r.overallFit >= 75 ? "#3B82F6" : r.overallFit >= 60 ? "#F97316" : "#9CA3AF";

                      return (
                        <motion.div
                          key={r.candidate.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="px-6 py-4 hover:bg-gray-50/70 transition-colors"
                          data-testid={`result-candidate-${r.candidate.id}`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Rank */}
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 mt-1 ${i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-gray-100 text-gray-600" : "bg-gray-50 text-gray-400"}`}>
                              {i + 1}
                            </div>

                            <AvatarCircle name={r.candidate.name} />

                            {/* Main info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-gray-900 text-sm">{r.candidate.name}</span>
                                <FitBadge pct={r.overallFit} />
                                {r.candidate.available && (
                                  <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">Available</span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5 font-medium">
                                {r.candidate.specialization} · {r.candidate.city} · {r.candidate.college || "Engineering"}
                              </div>

                              {/* Fit bars row */}
                              <div className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-1.5">
                                {[
                                  { label: "Domain Fit", value: r.domainScore, color: "#8B5CF6" },
                                  { label: "TFES Fit", value: r.tfesScore, color: "#3B82F6" },
                                  { label: "Skill Match", value: r.skillScore, color: "#14B8A6" },
                                  { label: "Tier Match", value: r.tierScore, color: "#22C55E" },
                                ].map((bar) => (
                                  <div key={bar.label}>
                                    <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-0.5">
                                      <span>{bar.label}</span>
                                      <span style={{ color: bar.color }}>{bar.value}%</span>
                                    </div>
                                    <FitBar value={bar.value} color={bar.color} />
                                  </div>
                                ))}
                              </div>

                              {/* Skills */}
                              <div className="flex flex-wrap gap-1 mt-2.5">
                                {r.matchedSkills.map((s) => (
                                  <span key={s} className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center gap-0.5">
                                    <Check className="w-2.5 h-2.5" /> {s}
                                  </span>
                                ))}
                                {r.missingSkills.map((s) => (
                                  <span key={s} className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center gap-0.5">
                                    <AlertCircle className="w-2.5 h-2.5" /> {s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Right side */}
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <div className="text-center">
                                <div className="font-mono font-black text-purple-600 text-xl leading-tight">{r.candidate.tfes}</div>
                                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">/100 TFES</div>
                              </div>
                              <div className="flex items-center gap-0.5 text-amber-500">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs font-bold text-gray-700">{r.candidate.rating}</span>
                              </div>
                              <div className="flex gap-1.5 mt-1">
                                <button
                                  onClick={() => setSelectedResult(isExpanded ? null : r.candidate.id)}
                                  className="text-[11px] font-bold text-gray-500 border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                                  data-testid={`btn-expand-${r.candidate.id}`}
                                >
                                  {isExpanded ? "Less" : "More"}
                                </button>
                                <button
                                  onClick={() => handleInvite(r.candidate.id)}
                                  className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${isInvited ? "bg-green-100 text-green-700 border border-green-200" : "bg-purple-600 text-white hover:bg-purple-700 shadow-sm"}`}
                                  data-testid={`btn-invite-${r.candidate.id}`}
                                >
                                  {isInvited ? <><Check className="w-3 h-3" /> Invited</> : <>Invite <ArrowRight className="w-3 h-3" /></>}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Expanded detail */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 ml-10 pl-4 border-l-2 border-purple-100 space-y-2">
                                  <div className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                    <span className="text-purple-700 font-bold">AI Insight:</span> {r.explanation || `${r.candidate.name} shows strong alignment with your project requirements, particularly in ${r.matchedSkills.slice(0, 2).join(" and ")}.`}
                                  </div>
                                  <div className="flex gap-4 text-[11px] text-gray-500">
                                    <span><span className="font-bold text-gray-700">{r.candidate.simulations}</span> Simulations</span>
                                    <span><span className="font-bold text-gray-700">{r.candidate.projects}</span> Projects</span>
                                    <span><span className="font-bold text-gray-700">{r.candidate.badges}</span> NFT Badges</span>
                                    <span className="font-mono text-green-700 font-bold">₹{r.candidate.earned?.toLocaleString("en-IN")} earned</span>
                                  </div>
                                  <button
                                    onClick={() => { onClose(); setLocation(`/candidate/${r.candidate.id}`); }}
                                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                    data-testid={`btn-view-profile-${r.candidate.id}`}
                                  >
                                    View Full Profile <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              {step === "form" && (
                <>
                  <p className="text-[11px] text-gray-400 font-medium">AI scores 2,500+ candidates against your requirements instantly.</p>
                  <button
                    onClick={handleRunMatch}
                    disabled={!title.trim()}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
                    data-testid="btn-run-ai-match"
                  >
                    <Zap className="w-4 h-4" /> Run AI Match
                  </button>
                </>
              )}
              {step === "analyzing" && (
                <p className="text-[11px] text-gray-400 font-medium w-full text-center">Scanning candidate pool — this takes just a moment...</p>
              )}
              {step === "results" && (
                <>
                  <div className="text-[11px] text-gray-400 font-medium">
                    {invitedIds.size > 0 ? <span className="text-green-600 font-bold">{invitedIds.size} candidate{invitedIds.size > 1 ? "s" : ""} invited</span> : "Click Invite to add candidates to this project."}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setStep("form")} className="border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-white transition-colors" data-testid="btn-refine-match">
                      Refine
                    </button>
                    <button onClick={onClose} className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-purple-700 transition-colors" data-testid="btn-done-match">
                      Done
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

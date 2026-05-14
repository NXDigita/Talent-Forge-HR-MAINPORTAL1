import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, FolderPlus, Check, Rocket, Layers, IndianRupee, CalendarDays, Users } from "lucide-react";

export type NewProject = {
  id: string;
  title: string;
  domain: string;
  description: string;
  budget: number;
  tier: string;
  stage: string;
  daysLeft: number;
  applicants: number;
  assignedTo: string;
  milestones: { label: string; pct: number }[];
  escrow: { total: number; released: number; held: number; milestone: number; of: number };
};

const DOMAINS = ["ECE", "EEE", "CS", "Mechanical", "DS", "Robotics", "Cloud", "AI/ML", "Civil", "Embedded"];
const TIERS = [
  { value: "Apprentice", label: "Apprentice", desc: "TFES 60–70 · Entry-level tasks", color: "#6B7280" },
  { value: "Practitioner", label: "Practitioner", desc: "TFES 71–83 · Standard projects", color: "#F6821F" },
  { value: "Expert", label: "Expert", desc: "TFES 84–92 · Complex systems", color: "#7C3AED" },
  { value: "Master", label: "Master", desc: "TFES 93+ · Research-grade work", color: "#0F766E" },
];

const STEP_LABELS = ["Project Details", "Budget & Milestones", "Review & Post"];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5 px-6 py-3 bg-gray-50 border-b border-gray-100">
      {STEP_LABELS.map((label, i) => (
        <React.Fragment key={i}>
          <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors`}
            style={{ color: step === i ? "#F6821F" : step > i ? "#16A34A" : "#9CA3AF" }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all"
              style={step === i
                ? { background: "#F6821F", borderColor: "#F6821F", color: "white" }
                : step > i
                  ? { background: "#16A34A", borderColor: "#16A34A", color: "white" }
                  : { borderColor: "#D1D5DB", color: "#9CA3AF" }}>
              {step > i ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <span className="hidden sm:block">{label}</span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className="flex-1 h-px max-w-[40px]" style={{ background: step > i ? "#16A34A" : "#E5E7EB" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  onPost: (project: NewProject) => void;
}

export function PostProjectModal({ open, onClose, onPost }: Props) {
  const [step, setStep] = useState(0);
  const [posted, setPosted] = useState(false);

  // Step 1
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [tier, setTier] = useState("Practitioner");

  // Step 2
  const [budget, setBudget] = useState("");
  const [milestoneCount, setMilestoneCount] = useState<2 | 3>(3);
  const [milestoneLabels, setMilestoneLabels] = useState(["Design & Spec", "Implementation", "Testing & Delivery"]);
  const [daysLeft, setDaysLeft] = useState(14);

  const budgetNum = parseInt(budget.replace(/[^\d]/g, ""), 10) || 0;
  const milestonePcts = milestoneCount === 2 ? [50, 50] : [33, 34, 33];
  const milestoneAmounts = milestonePcts.map(p => Math.round(budgetNum * p / 100));

  const canStep1 = title.trim().length > 3 && domain && tier;
  const canStep2 = budgetNum >= 5000 && daysLeft >= 3;

  function reset() {
    setStep(0); setPosted(false);
    setTitle(""); setDomain(""); setDescription(""); setTier("Practitioner");
    setBudget(""); setMilestoneCount(3); setMilestoneLabels(["Design & Spec", "Implementation", "Testing & Delivery"]);
    setDaysLeft(14);
  }

  function handlePost() {
    setPosted(true);
    setTimeout(() => {
      const newProject: NewProject = {
        id: `p${Date.now()}`,
        title,
        domain,
        description,
        budget: budgetNum,
        tier,
        stage: "posted",
        daysLeft,
        applicants: 0,
      assignedTo: "",
        milestones: milestoneLabels.slice(0, milestoneCount).map((label, i) => ({ label, pct: milestonePcts[i] })),
        escrow: { total: budgetNum, released: 0, held: budgetNum, milestone: 0, of: milestoneCount },
      };
      onPost(newProject);
      reset();
      onClose();
    }, 1800);
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(15,20,35,0.7)", backdropFilter: "blur(6px)" }}
        onClick={(e) => { if (e.target === e.currentTarget && !posted) { reset(); onClose(); } }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.22 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: "90vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                <FolderPlus className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Post a New Project</div>
                <div className="text-[11px] text-gray-400">AI-matched engineers will apply within 24 hrs</div>
              </div>
            </div>
            {!posted && (
              <button onClick={() => { reset(); onClose(); }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {!posted && <StepIndicator step={step} />}

          {/* Posted success state */}
          {posted ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                <Rocket className="w-9 h-9 text-white" />
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900 mb-2">Project Posted!</motion.h2>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-gray-500 text-sm max-w-xs">
                <span className="font-bold text-gray-800">{title}</span> is now live.
                AI matching will find engineers for you shortly.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="mt-6 flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full"
                style={{ background: "rgba(246,130,31,0.1)", color: "#C2600A" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Opening project view…
              </motion.div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">

                {/* ── Step 0: Project Details ── */}
                {step === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="p-6 space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                        Project Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g. ESP32 IoT Dashboard for Factory Floor"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400 transition-all"
                        style={{ '--tw-ring-color': 'rgba(246,130,31,0.4)' } as React.CSSProperties}
                        onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px rgba(246,130,31,0.15)'}
                        onBlur={e => e.currentTarget.style.boxShadow = ''}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          Domain <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={domain}
                          onChange={e => setDomain(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none transition-all appearance-none cursor-pointer"
                          onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px rgba(246,130,31,0.15)'}
                          onBlur={e => e.currentTarget.style.boxShadow = ''}
                        >
                          <option value="">Select domain…</option>
                          {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                        <input
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          placeholder="Brief overview…"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                          onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px rgba(246,130,31,0.15)'}
                          onBlur={e => e.currentTarget.style.boxShadow = ''}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                        Required Tier <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {TIERS.map(t => (
                          <button
                            key={t.value}
                            onClick={() => setTier(t.value)}
                            className="text-left px-4 py-3 rounded-xl border-2 transition-all"
                            style={tier === t.value
                              ? { borderColor: t.color, background: `${t.color}10` }
                              : { borderColor: "#E5E7EB", background: "white" }}
                          >
                            <div className="font-bold text-sm" style={{ color: tier === t.value ? t.color : "#374151" }}>{t.label}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5">{t.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 1: Budget & Milestones ── */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          Total Budget <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">₹</span>
                          <input
                            type="number"
                            value={budget}
                            onChange={e => setBudget(e.target.value)}
                            placeholder="25000"
                            min={5000}
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono font-bold text-gray-900 focus:outline-none placeholder:text-gray-300 transition-all"
                            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px rgba(246,130,31,0.15)'}
                            onBlur={e => e.currentTarget.style.boxShadow = ''}
                          />
                        </div>
                        {budgetNum > 0 && budgetNum < 5000 && (
                          <p className="text-[11px] text-red-500 mt-1 font-medium">Minimum budget is ₹5,000</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          Timeline (days) <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range" min={3} max={90} value={daysLeft}
                            onChange={e => setDaysLeft(Number(e.target.value))}
                            className="flex-1 accent-orange-500"
                          />
                          <span className="font-mono font-bold text-sm w-10 text-right" style={{ color: '#F6821F' }}>{daysLeft}d</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
                          <span>3 days</span><span>90 days</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Milestone Split</label>
                        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
                          {([2, 3] as const).map(n => (
                            <button key={n} onClick={() => {
                              setMilestoneCount(n);
                              if (n === 2) setMilestoneLabels(l => [l[0], l[l.length - 1]]);
                              else setMilestoneLabels(["Design & Spec", "Implementation", "Testing & Delivery"]);
                            }}
                              className="px-3 py-1 rounded-md text-xs font-bold transition-all"
                              style={milestoneCount === n
                                ? { background: "#F6821F", color: "white" }
                                : { color: "#6B7280" }}>
                              {n} milestones
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {milestoneLabels.slice(0, milestoneCount).map((label, i) => (
                          <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                              style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                              {i + 1}
                            </div>
                            <input
                              value={label}
                              onChange={e => setMilestoneLabels(prev => prev.map((l, idx) => idx === i ? e.target.value : l))}
                              className="flex-1 bg-transparent text-sm font-medium text-gray-800 focus:outline-none min-w-0"
                              placeholder={`Milestone ${i + 1}`}
                            />
                            <div className="text-right flex-shrink-0">
                              <div className="font-mono font-bold text-green-600 text-sm">
                                {budgetNum > 0 ? `₹${milestoneAmounts[i].toLocaleString()}` : `${milestonePcts[i]}%`}
                              </div>
                              <div className="text-[10px] text-gray-400">{milestonePcts[i]}%</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {budgetNum > 0 && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full overflow-hidden flex">
                            {milestonePcts.slice(0, milestoneCount).map((p, i) => (
                              <div key={i} className="h-full transition-all"
                                style={{
                                  width: `${p}%`,
                                  background: i === 0 ? "#F6821F" : i === 1 ? "#D97706" : "#92400E",
                                  borderRight: i < milestoneCount - 1 ? "2px solid white" : "none"
                                }} />
                            ))}
                          </div>
                          <span className="text-xs font-mono font-bold text-green-600">₹{budgetNum.toLocaleString()} total</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold">i</span>
                      </div>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Funds are held in <strong>blockchain escrow</strong> and released automatically when each milestone is approved by your reviewer. Industry avg hiring cost: ₹40K — TalentForge avg: ₹18K.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Review ── */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="p-6 space-y-5">
                    <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: 'rgba(246,130,31,0.3)' }}>
                      {/* Project header preview */}
                      <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #FFF8F1, #FEF3E2)' }}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded mb-2"
                              style={{ background: 'rgba(246,130,31,0.15)', color: '#C2600A' }}>{domain}</span>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
                            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="font-mono text-2xl font-bold text-green-600">₹{budgetNum.toLocaleString()}</div>
                            <div className="text-xs text-gray-400 mt-0.5">total budget</div>
                          </div>
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
                        {[
                          { icon: Users, label: "Required Tier", value: tier },
                          { icon: CalendarDays, label: "Timeline", value: `${daysLeft} days` },
                          { icon: Layers, label: "Milestones", value: `${milestoneCount} phases` },
                        ].map(({ icon: Icon, label, value }) => (
                          <div key={label} className="px-4 py-3 flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(246,130,31,0.1)', color: '#F6821F' }}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{label}</div>
                              <div className="text-sm font-bold text-gray-800">{value}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Milestone breakdown */}
                      <div className="border-t border-gray-100 px-5 py-4">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Escrow Milestone Breakdown</div>
                        <div className="space-y-2">
                          {milestoneLabels.slice(0, milestoneCount).map((label, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                                  style={{ background: i === 0 ? "#F6821F" : i === 1 ? "#D97706" : "#92400E" }}>
                                  {i + 1}
                                </div>
                                <span className="text-sm text-gray-700 font-medium">{label}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${milestonePcts[i]}%`, background: i === 0 ? "#F6821F" : i === 1 ? "#D97706" : "#92400E" }} />
                                </div>
                                <span className="font-mono text-sm font-bold text-green-600 w-20 text-right">
                                  ₹{milestoneAmounts[i].toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-green-50 border border-green-100">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <p className="text-xs text-green-700 font-medium leading-relaxed">
                        TalentForge AI will immediately match this project with <strong>verified engineers</strong> who meet the {tier} tier requirement. You'll receive applications within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          )}

          {/* Footer nav */}
          {!posted && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3">
              <div>
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { reset(); onClose(); }}
                  className="text-sm font-bold text-gray-400 hover:text-gray-600 px-3 py-2 transition-colors">
                  Cancel
                </button>
                {step < 2 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={step === 0 ? !canStep1 : !canStep2}
                    className="flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-xl text-white shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handlePost}
                    className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}
                  >
                    <Rocket className="w-4 h-4" /> Post Project
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

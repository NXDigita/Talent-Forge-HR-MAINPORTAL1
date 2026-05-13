import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, ChevronRight, Star, ShieldCheck, RotateCcw, XCircle } from "lucide-react";
import { MilestoneReviewModal, type Review } from "@/components/reviewer/MilestoneReviewModal";

type CompletedReview = {
  id: string;
  candidate: string;
  project: string;
  score: number;
  stars: number;
  decision: "approve" | "reject" | "revision";
  comment: string;
};

const INITIAL_PENDING: Review[] = [
  {
    id: "r1", priority: "urgent",
    candidate: "Arjun K.", candidateInitials: "AK",
    project: "ESP32 Milestone 2", projectDomain: "ECE",
    due: "Today", score: 94,
    escrowAmount: 7333, milestone: "2", milestoneOf: "3"
  },
  {
    id: "r2", priority: "normal",
    candidate: "Priya S.", candidateInitials: "PS",
    project: "Python Pipeline M1", projectDomain: "CS/DS",
    due: "Tomorrow", score: 88,
    escrowAmount: 9333, milestone: "1", milestoneOf: "3"
  },
  {
    id: "r3", priority: "low",
    candidate: "Vikram R.", candidateInitials: "VR",
    project: "CAD Assembly", projectDomain: "Mechanical",
    due: "3 days", score: 82,
    escrowAmount: 6000, milestone: "2", milestoneOf: "2"
  },
];

const INITIAL_COMPLETED: CompletedReview[] = [
  { id: "c1", candidate: "Ravi T.", project: "React HR Dashboard M3", score: 92, stars: 5, decision: "approve", comment: "" },
  { id: "c2", candidate: "Deepa K.", project: "Load Flow Analysis M1", score: 89, stars: 4, decision: "approve", comment: "" },
  { id: "c3", candidate: "Kavya M.", project: "ML Pipeline M2", score: 96, stars: 5, decision: "approve", comment: "" },
];

const PRIORITY_CONFIG = {
  urgent: { icon: AlertCircle, border: "border-l-red-500", badge: "bg-red-50 text-red-700", iconColor: "text-red-500", label: "Urgent" },
  normal: { icon: Clock, border: "border-l-amber-500", badge: "bg-amber-50 text-amber-700", iconColor: "text-amber-500", label: "Review" },
  low: { icon: Clock, border: "border-l-gray-300", badge: "bg-gray-100 text-gray-600", iconColor: "text-gray-400", label: "Pending" },
};

export function Reviewer() {
  const [pending, setPending] = useState<Review[]>(INITIAL_PENDING);
  const [completed, setCompleted] = useState<CompletedReview[]>(INITIAL_COMPLETED);
  const [activeReview, setActiveReview] = useState<Review | null>(null);

  const reviewsDone = completed.length;
  const reviewsPending = pending.length;

  function handleDecision(
    id: string,
    decision: "approve" | "reject" | "revision",
    finalScore: number,
    comment: string,
    stars: number
  ) {
    const review = pending.find(r => r.id === id);
    if (!review) return;
    if (decision !== "revision") {
      setPending(p => p.filter(r => r.id !== id));
      setCompleted(c => [{
        id: `done-${id}`,
        candidate: review.candidate,
        project: review.project,
        score: finalScore,
        stars,
        decision,
        comment,
      }, ...c]);
    } else {
      // Keep in list but mark as revision-requested (move to end)
      setPending(p => [...p.filter(r => r.id !== id), { ...review, priority: "low" as const }]);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">

      {/* Reviewer profile card */}
      <div className="rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(224 25% 18%) 0%, hsl(224 25% 13%) 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #F6821F, #D97706)" }} />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold border-2"
            style={{ background: "rgba(246,130,31,0.2)", borderColor: "rgba(246,130,31,0.4)", color: "#F6821F" }}>MJ</div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "hsl(40 22% 92%)" }}>Meena Joshi</h1>
            <p className="font-medium" style={{ color: "hsl(224 12% 60%)" }}>Senior Engineer · AutoSense Labs</p>
          </div>
        </div>
        <div className="flex gap-10">
          <motion.div layout>
            <motion.div
              key={reviewsDone}
              initial={{ scale: 1.4, color: "#4ade80" }}
              animate={{ scale: 1, color: "#4ade80" }}
              transition={{ duration: 0.4 }}
              className="text-4xl font-bold font-mono"
            >
              {reviewsDone}
            </motion.div>
            <div className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color: "hsl(224 12% 55%)" }}>Reviews Done</div>
          </motion.div>
          <motion.div layout>
            <motion.div
              key={reviewsPending}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-4xl font-bold font-mono"
              style={{ color: reviewsPending === 0 ? "#4ade80" : "#F6821F" }}
            >
              {reviewsPending}
            </motion.div>
            <div className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color: "hsl(224 12% 55%)" }}>Pending</div>
          </motion.div>
        </div>
      </div>

      {/* Pending reviews */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Action Required
          <AnimatePresence mode="popLayout">
            <motion.span
              key={reviewsPending}
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold"
            >
              {reviewsPending}
            </motion.span>
          </AnimatePresence>
        </h2>

        <AnimatePresence mode="popLayout">
          {pending.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-2xl p-10 text-center shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div className="font-bold text-gray-800 text-lg mb-1">All caught up!</div>
              <p className="text-gray-400 text-sm">No pending milestone reviews. Great work, Meena.</p>
            </motion.div>
          ) : (
            pending.map((review, i) => {
              const cfg = PRIORITY_CONFIG[review.priority];
              const PriorityIcon = cfg.icon;
              return (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40, scale: 0.96 }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-white border p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow border-l-4 ${cfg.border}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 flex-shrink-0 ${cfg.iconColor}`}>
                      <PriorityIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                        <span className="text-sm font-bold text-gray-900">{review.project}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase"
                          style={{ background: "rgba(246,130,31,0.1)", color: "#C2600A" }}>
                          M{review.milestone}/{review.milestoneOf}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{review.candidate}</span>
                        <span className="mx-1.5 text-gray-300">·</span>
                        Due: {review.due}
                        <span className="mx-1.5 text-gray-300">·</span>
                        <span className="font-mono font-bold text-green-600">₹{review.escrowAmount.toLocaleString()}</span> escrow
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-center">
                      <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Auto-Score</div>
                      <div className="font-mono text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-lg">
                        {review.score}/100
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveReview(review)}
                      className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow transition-all hover:shadow-md hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}
                    >
                      Review Now <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Completed reviews table */}
      <div className="pt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          Completed Reviews
          <span className="text-sm font-normal text-gray-400">({completed.length})</span>
        </h2>
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead style={{ background: "hsl(42 20% 97%)" }}>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 font-bold text-gray-500 text-[11px] uppercase tracking-widest">Candidate</th>
                <th className="px-5 py-3 font-bold text-gray-500 text-[11px] uppercase tracking-widest">Project</th>
                <th className="px-5 py-3 font-bold text-gray-500 text-[11px] uppercase tracking-widest text-center">Score</th>
                <th className="px-5 py-3 font-bold text-gray-500 text-[11px] uppercase tracking-widest text-center">Rating</th>
                <th className="px-5 py-3 font-bold text-gray-500 text-[11px] uppercase tracking-widest text-right">Decision</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {completed.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    layout
                    initial={{ opacity: 0, backgroundColor: "rgba(246,130,31,0.08)" }}
                    animate={{ opacity: 1, backgroundColor: "rgba(255,255,255,0)" }}
                    transition={{ duration: 0.6, delay: i === 0 ? 0 : i * 0.04 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0"
                  >
                    <td className="px-5 py-4 font-semibold text-gray-900">{r.candidate}</td>
                    <td className="px-5 py-4 text-gray-500">{r.project}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="font-mono font-bold text-sm" style={{ color: r.score >= 90 ? "#16A34A" : r.score >= 75 ? "#D97706" : "#DC2626" }}>
                        {r.score}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {r.stars > 0
                        ? <span className="inline-flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" /> {r.stars}.0
                          </span>
                        : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {r.decision === "approve" && (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 font-bold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wide">
                          <ShieldCheck className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {r.decision === "reject" && (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 font-bold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wide">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Review modal */}
      {activeReview && (
        <MilestoneReviewModal
          review={activeReview}
          open={!!activeReview}
          onClose={() => setActiveReview(null)}
          onDecision={(id, decision, score, comment, stars) => {
            handleDecision(id, decision, score, comment, stars);
            setActiveReview(null);
          }}
        />
      )}
    </div>
  );
}

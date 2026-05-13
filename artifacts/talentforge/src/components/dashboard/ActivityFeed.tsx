import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  CheckCircle2, Coins, Sparkles, Star, FolderPlus,
  UserPlus, ShieldCheck, XCircle, RotateCcw, Bell
} from "lucide-react";

type EventType = "submission" | "payment" | "ai_match" | "rating" | "project" | "applicant" | "approved" | "rejected" | "revision" | "system";

type FeedEvent = {
  id: string;
  type: EventType;
  title: string;
  sub: string;
  ts: number; // unix ms
};

const EVENT_CONFIG: Record<EventType, { icon: React.ElementType; iconBg: string; iconColor: string; dot: string }> = {
  submission: { icon: CheckCircle2,  iconBg: "rgba(246,130,31,0.12)", iconColor: "#F6821F",  dot: "#F6821F"  },
  payment:    { icon: Coins,         iconBg: "rgba(22,163,74,0.1)",   iconColor: "#16A34A",  dot: "#16A34A"  },
  ai_match:   { icon: Sparkles,      iconBg: "rgba(139,92,246,0.1)",  iconColor: "#7C3AED",  dot: "#7C3AED"  },
  rating:     { icon: Star,          iconBg: "rgba(245,158,11,0.1)",  iconColor: "#D97706",  dot: "#D97706"  },
  project:    { icon: FolderPlus,    iconBg: "rgba(59,130,246,0.1)",  iconColor: "#3B82F6",  dot: "#3B82F6"  },
  applicant:  { icon: UserPlus,      iconBg: "rgba(20,184,166,0.1)",  iconColor: "#0D9488",  dot: "#0D9488"  },
  approved:   { icon: ShieldCheck,   iconBg: "rgba(22,163,74,0.1)",   iconColor: "#16A34A",  dot: "#16A34A"  },
  rejected:   { icon: XCircle,       iconBg: "rgba(220,38,38,0.1)",   iconColor: "#DC2626",  dot: "#DC2626"  },
  revision:   { icon: RotateCcw,     iconBg: "rgba(245,158,11,0.1)",  iconColor: "#D97706",  dot: "#D97706"  },
  system:     { icon: Bell,          iconBg: "rgba(107,114,128,0.1)", iconColor: "#6B7280",  dot: "#6B7280"  },
};

const SEED_EVENTS: FeedEvent[] = [
  { id: "s1", type: "submission", title: "Arjun K. submitted Milestone 2", sub: "ESP32 IoT Dashboard · ECE", ts: Date.now() - 2 * 60 * 60 * 1000 },
  { id: "s2", type: "payment",    title: "₹7,333 escrow released to Arjun K.", sub: "ESP32 Milestone 1/3 · Polygon confirmed", ts: Date.now() - 5 * 60 * 60 * 1000 },
  { id: "s3", type: "ai_match",   title: "8 engineers matched via AI", sub: "STM32 Firmware Sensor Array · Expert tier", ts: Date.now() - 8 * 60 * 60 * 1000 },
  { id: "s4", type: "rating",     title: "Vikram R. rated 4.9 ★", sub: "Reviewed by Meena J. · CAD Assembly", ts: Date.now() - 24 * 60 * 60 * 1000 },
  { id: "s5", type: "project",    title: "New project posted: CAD Assembly", sub: "SolidWorks · Mechanical · Apprentice tier", ts: Date.now() - 26 * 60 * 60 * 1000 },
  { id: "s6", type: "applicant",  title: "Priya S. applied to Python ETL Pipeline", sub: "TFES 88 · Practitioner · CS/DS", ts: Date.now() - 30 * 60 * 60 * 1000 },
  { id: "s7", type: "approved",   title: "Milestone approved: React HR Dashboard M3", sub: "Ravi T. · Score 92/100 · ₹32,000 released", ts: Date.now() - 48 * 60 * 60 * 1000 },
];

const LIVE_POOL: Omit<FeedEvent, "id" | "ts">[] = [
  { type: "applicant",  title: "Deepa K. applied to Load Flow Analysis",   sub: "TFES 91 · Expert · EEE" },
  { type: "submission", title: "Priya S. submitted Milestone 1",            sub: "Python ETL Pipeline · CS/DS" },
  { type: "ai_match",   title: "12 engineers matched via AI",               sub: "Load Flow Analysis EEE · Expert tier" },
  { type: "payment",    title: "₹8,000 escrow released to Deepa K.",        sub: "Load Flow M1/3 · Polygon confirmed" },
  { type: "approved",   title: "Milestone approved: Python Pipeline M1",    sub: "Priya S. · Score 91/100" },
  { type: "applicant",  title: "Ravi M. applied to CAD Assembly",           sub: "TFES 79 · Apprentice · Mechanical" },
  { type: "rating",     title: "Priya S. rated 4.7 ★",                     sub: "Reviewed by Meena J." },
  { type: "project",    title: "New project posted: React Native App",      sub: "Mobile · CS · Practitioner tier" },
  { type: "system",     title: "TFES audit complete — 100 engineers",       sub: "Scores refreshed from exam board" },
  { type: "revision",   title: "Revision requested: CAD Assembly M2",       sub: "Vikram R. — missing 3rd view angle" },
];

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const secs = Math.floor(diff / 1000);
  if (secs < 60)  return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60)  return `${mins}m ago`;
  const hrs  = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function ActivityFeed() {
  const [events, setEvents] = useState<FeedEvent[]>(SEED_EVENTS);
  const [, tick] = useState(0);
  const poolIndexRef = useRef(0);
  const [paused, setPaused] = useState(false);

  // Re-render relative times every 30s
  useEffect(() => {
    const t = setInterval(() => tick(n => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  // Inject new live events every 5s (pause-able)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      const template = LIVE_POOL[poolIndexRef.current % LIVE_POOL.length];
      poolIndexRef.current += 1;
      const newEvent: FeedEvent = {
        ...template,
        id: `live-${Date.now()}`,
        ts: Date.now(),
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 20));
    }, 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-gray-900">Activity Feed</h3>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
            style={{ background: paused ? "rgba(107,114,128,0.1)" : "rgba(22,163,74,0.1)" }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: paused ? "#6B7280" : "#16A34A" }}
              animate={paused ? {} : { opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />
            <span className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: paused ? "#6B7280" : "#16A34A" }}>
              {paused ? "Paused" : "Live"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaused(p => !p)}
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors"
            style={paused
              ? { background: "rgba(246,130,31,0.1)", color: "#C2600A" }
              : { background: "rgba(107,114,128,0.08)", color: "#6B7280" }}
          >
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <Link href="/pipeline" className="text-xs font-bold hover:underline" style={{ color: "#F6821F" }}>
            View All →
          </Link>
        </div>
      </div>

      {/* Feed */}
      <div className="divide-y divide-gray-50" style={{ maxHeight: 380, overflowY: "auto" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {events.map((event, i) => {
            const cfg = EVENT_CONFIG[event.type];
            const Icon = cfg.icon;
            const isNew = i === 0 && Date.now() - event.ts < 6000;
            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: -16, backgroundColor: "rgba(246,130,31,0.06)" }}
                animate={{ opacity: 1, y: 0, backgroundColor: "rgba(255,255,255,0)" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-start gap-3.5 px-6 py-3.5 hover:bg-gray-50/60 transition-colors group"
              >
                {/* Icon */}
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: cfg.iconBg }}>
                  <Icon className="w-4 h-4" style={{ color: cfg.iconColor }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900 leading-snug">{event.title}</span>
                    {isNew && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest flex-shrink-0"
                        style={{ background: "rgba(246,130,31,0.15)", color: "#C2600A" }}
                      >
                        New
                      </motion.span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">{event.sub}</div>
                </div>

                {/* Dot + time */}
                <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot, opacity: 0.5 }} />
                  <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                    {relativeTime(event.ts)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <span className="text-[11px] text-gray-400 font-medium">
          Showing {events.length} events · updates every 5s
        </span>
        <button
          onClick={() => setEvents(SEED_EVENTS)}
          className="text-[11px] font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

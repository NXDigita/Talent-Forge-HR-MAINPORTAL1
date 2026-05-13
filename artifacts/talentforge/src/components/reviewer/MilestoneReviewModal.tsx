import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle2, XCircle, RotateCcw, Star, ChevronRight,
  FileCode2, FileText, AlertCircle, Zap, ShieldCheck, Coins
} from "lucide-react";

export type Review = {
  id: string;
  priority: "urgent" | "normal" | "low";
  candidate: string;
  candidateInitials: string;
  project: string;
  projectDomain: string;
  due: string;
  score: number;
  escrowAmount: number;
  milestone: string;
  milestoneOf: string;
};

type Decision = "approve" | "reject" | "revision" | null;

const MOCK_SUBMISSIONS: Record<string, { files: string[]; code: string; criteria: { label: string; pass: boolean; note: string }[] }> = {
  r1: {
    files: ["main.c", "freertos_config.h", "esp32_gpio.c", "uart_comm.c", "README.md"],
    code: `// ESP32 IoT Dashboard — UART Sensor Read
// Milestone 2: Data Aggregation & MQTT Pub

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/uart.h"
#include "esp_log.h"
#include "mqtt_client.h"

#define UART_PORT     UART_NUM_1
#define BUF_SIZE      1024
#define SAMPLE_RATE   500   // ms

static const char *TAG = "SENSOR_AGG";

void sensor_task(void *pvParam) {
    uint8_t buf[BUF_SIZE];
    esp_mqtt_client_handle_t client =
        (esp_mqtt_client_handle_t)pvParam;

    while (1) {
        int len = uart_read_bytes(UART_PORT, buf,
                    BUF_SIZE, pdMS_TO_TICKS(100));
        if (len > 0) {
            buf[len] = '\\0';
            char topic[64];
            snprintf(topic, sizeof(topic),
                "/factory/sensor/%d", SENSOR_ID);
            esp_mqtt_client_publish(client, topic,
                (char*)buf, len, 1, 0);
            ESP_LOGI(TAG, "Published %d bytes", len);
        }
        vTaskDelay(pdMS_TO_TICKS(SAMPLE_RATE));
    }
}`,
    criteria: [
      { label: "All unit tests pass (47/47)", pass: true, note: "100% pass rate" },
      { label: "Memory usage < 32KB RAM", pass: true, note: "Actual: 18.4KB" },
      { label: "UART timing within spec", pass: true, note: "±2ms jitter" },
      { label: "MQTT retain + QoS=1", pass: true, note: "Confirmed via broker log" },
      { label: "No compiler warnings", pass: false, note: "-Wunused-variable in uart_comm.c:42" },
    ]
  },
  r2: {
    files: ["pipeline.py", "transform.py", "test_pipeline.py", "schema.sql", "requirements.txt"],
    code: `# Python ETL Pipeline — Milestone 1
# Data ingestion & transformation layer

import pandas as pd
from sqlalchemy import create_engine
from typing import Generator
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ETLPipeline:
    def __init__(self, source_url: str, sink_url: str):
        self.source = create_engine(source_url)
        self.sink   = create_engine(sink_url)

    def extract(self, query: str) -> pd.DataFrame:
        logger.info("Extracting data…")
        return pd.read_sql(query, self.source)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df = df.dropna(subset=["sensor_id", "timestamp"])
        df["timestamp"] = pd.to_datetime(df["timestamp"])
        df["value_norm"] = (
            (df["value"] - df["value"].mean())
            / df["value"].std()
        )
        return df[["sensor_id","timestamp","value_norm"]]

    def load(self, df: pd.DataFrame, table: str):
        logger.info(f"Loading {len(df)} rows → {table}")
        df.to_sql(table, self.sink,
                  if_exists="append", index=False)`,
    criteria: [
      { label: "All 31 pytest cases pass", pass: true, note: "31/31 ✓" },
      { label: "Data type integrity maintained", pass: true, note: "Schema validated" },
      { label: "Handles null values correctly", pass: true, note: "dropna tested" },
      { label: "Performance: 100K rows < 8s", pass: true, note: "Actual: 5.2s" },
      { label: "Type annotations present", pass: false, note: "Missing on transform() return" },
    ]
  },
  r3: {
    files: ["assembly.SLDASM", "gear_analysis.pdf", "FEA_report.xlsx", "BOM.csv", "notes.txt"],
    code: `// SolidWorks CAD — FEA Report Extract
// Gear Assembly Structural Analysis

MATERIAL: Alloy Steel (AISI 1045)
MESH:     Fine — 3.2mm element size
LOAD:     450 N·m torque @ shaft

=== STRESS ANALYSIS ===
Max Von Mises:  312 MPa
Yield Strength: 530 MPa
Safety Factor:  1.70 ✓  (req ≥ 1.5)

=== DISPLACEMENT ===
Max deformation: 0.043 mm
Angular twist:   0.12°

=== FATIGUE ===
Life estimate:   2.1M cycles
Endurance limit: 240 MPa
Goodman FoS:     1.82 ✓

=== CONTACT ANALYSIS ===
Hertzian contact stress: 892 MPa
Allowable contact:       960 MPa ✓
Interference check:      PASS

Recommendation: Design meets all structural
requirements. Proceed to manufacturing review.`,
    criteria: [
      { label: "Safety factor ≥ 1.5", pass: true, note: "Actual: 1.70" },
      { label: "FEA mesh quality verified", pass: true, note: "Aspect ratio < 3:1" },
      { label: "All tolerances documented", pass: true, note: "GD&T complete" },
      { label: "BOM complete with part nos.", pass: true, note: "12 parts listed" },
      { label: "Drawing views ≥ 3 angles", pass: false, note: "Only 2 views provided" },
    ]
  }
};

const SCORE_DIMS = [
  { key: "correctness", label: "Correctness", hint: "Does it meet the spec?" },
  { key: "quality", label: "Code / Build Quality", hint: "Clean, maintainable, no hacks" },
  { key: "performance", label: "Performance", hint: "Speed, memory, efficiency" },
  { key: "docs", label: "Documentation", hint: "README, inline comments" },
  { key: "comms", label: "Communication", hint: "Clarity of submission notes" },
];

function ScoreSlider({ label, hint, value, onChange }: { label: string; hint: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-gray-700">{label}</span>
          <span className="text-[10px] text-gray-400 ml-2">{hint}</span>
        </div>
        <span className="font-mono font-bold text-sm" style={{ color: value >= 80 ? '#16A34A' : value >= 60 ? '#D97706' : '#DC2626' }}>
          {value}
        </span>
      </div>
      <input
        type="range" min={0} max={100} step={5} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#F6821F' }}
      />
    </div>
  );
}

interface Props {
  review: Review;
  open: boolean;
  onClose: () => void;
  onDecision: (id: string, decision: "approve" | "reject" | "revision", finalScore: number, comment: string, stars: number) => void;
}

export function MilestoneReviewModal({ review, open, onClose, onDecision }: Props) {
  const [activeFile, setActiveFile] = useState(0);
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [comment, setComment] = useState("");
  const [checklist, setChecklist] = useState([true, true, false, false]);
  const [decision, setDecision] = useState<Decision>(null);
  const [releasing, setReleasing] = useState(false);

  const sub = MOCK_SUBMISSIONS[review.id] ?? MOCK_SUBMISSIONS.r1;
  const checklistItems = ["Functionality meets spec", "Code / build quality acceptable", "Documentation complete", "Performance within bounds"];

  const [scores, setScores] = useState({ correctness: 90, quality: 85, performance: 88, docs: 72, comms: 80 });
  const reviewerScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5);
  const blendedScore = Math.round(review.score * 0.6 + reviewerScore * 0.4);
  const passedCriteria = sub.criteria.filter(c => c.pass).length;

  function handleDecision(d: "approve" | "reject" | "revision") {
    if (d === "approve") {
      setReleasing(true);
      setTimeout(() => {
        setDecision("approve");
        setTimeout(() => {
          onDecision(review.id, d, blendedScore, comment, stars);
          onClose();
        }, 1800);
      }, 900);
    } else {
      setDecision(d);
      setTimeout(() => {
        onDecision(review.id, d, blendedScore, comment, stars);
        onClose();
      }, 800);
    }
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(10,14,28,0.8)", backdropFilter: "blur(8px)" }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.22 }}
          className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col"
          style={{ maxWidth: 1000, maxHeight: "92vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #F6821F, #D97706)" }}>
                {review.candidateInitials}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-gray-900 text-sm leading-tight truncate">
                  {review.project} <span className="text-gray-400 font-normal">·</span> {review.candidate}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                    style={{ background: "rgba(246,130,31,0.1)", color: "#C2600A" }}>{review.projectDomain}</span>
                  <span className="text-[10px] text-gray-400">Milestone {review.milestone}/{review.milestoneOf}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${review.priority === "urgent" ? "bg-red-50 text-red-600" : review.priority === "normal" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"}`}>
                    {review.priority}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* ── LEFT PANEL: Submission ── */}
            <div className="w-1/2 flex flex-col border-r border-gray-100 bg-gray-50" style={{ minWidth: 0 }}>
              {/* Auto-score banner */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, hsl(224 25% 16%), hsl(224 25% 13%))" }}>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: "#F6821F" }} />
                  <span className="text-xs font-bold" style={{ color: "hsl(40 18% 85%)" }}>
                    CIE Auto-Score
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px]" style={{ color: "hsl(224 12% 55%)" }}>
                    {passedCriteria}/{sub.criteria.length} criteria
                  </span>
                  <span className="font-mono font-bold text-lg text-green-400">{review.score}/100</span>
                </div>
              </div>

              {/* Acceptance criteria */}
              <div className="px-4 py-3 border-b border-gray-200 bg-white space-y-1.5">
                {sub.criteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${c.pass ? "bg-green-100" : "bg-red-100"}`}>
                      {c.pass
                        ? <CheckCircle2 className="w-3 h-3 text-green-600" />
                        : <XCircle className="w-3 h-3 text-red-500" />}
                    </div>
                    <div className="min-w-0">
                      <span className={`text-[11px] font-semibold ${c.pass ? "text-gray-700" : "text-red-700"}`}>{c.label}</span>
                      <span className="text-[10px] text-gray-400 ml-1.5">{c.note}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* File tabs */}
              <div className="flex gap-0.5 px-3 pt-2 overflow-x-auto flex-shrink-0 bg-gray-50">
                {sub.files.map((f, i) => {
                  const isCode = !f.endsWith(".pdf") && !f.endsWith(".xlsx") && !f.endsWith(".csv");
                  return (
                    <button
                      key={f}
                      onClick={() => setActiveFile(i)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-[11px] font-medium whitespace-nowrap transition-colors flex-shrink-0"
                      style={activeFile === i
                        ? { background: "#1E2333", color: "#F6821F", borderBottom: "2px solid #F6821F" }
                        : { color: "#6B7280", background: "transparent" }}
                    >
                      {isCode ? <FileCode2 className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                      {f}
                    </button>
                  );
                })}
              </div>

              {/* Code viewer */}
              <div className="flex-1 overflow-auto" style={{ background: "#1E2333" }}>
                <pre className="p-4 text-[11px] leading-relaxed font-mono overflow-x-auto"
                  style={{ color: "#E2D9C5", minHeight: "100%" }}>
                  {activeFile === 0
                    ? sub.code.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="w-7 text-right flex-shrink-0 select-none mr-4"
                          style={{ color: "hsl(224 12% 38%)" }}>{i + 1}</span>
                        <span style={{
                          color: line.trim().startsWith("//") || line.trim().startsWith("#") ? "hsl(224 12% 50%)"
                            : line.includes("void ") || line.includes("def ") || line.includes("class ") ? "#F6821F"
                              : line.includes("return") || line.includes("import") || line.includes("#include") ? "#7DD3FC"
                                : line.includes('"') || line.includes("'") ? "#86EFAC"
                                  : "#E2D9C5"
                        }}>{line}</span>
                      </div>
                    ))
                    : <div className="flex flex-col items-center justify-center h-48 gap-2">
                      <FileText className="w-8 h-8" style={{ color: "hsl(224 12% 40%)" }} />
                      <span style={{ color: "hsl(224 12% 50%)" }} className="text-xs">{sub.files[activeFile]} — preview not available</span>
                    </div>}
                </pre>
              </div>
            </div>

            {/* ── RIGHT PANEL: Review form ── */}
            <div className="w-1/2 flex flex-col" style={{ minWidth: 0 }}>
              <div className="flex-1 overflow-y-auto p-5 space-y-5">

                {/* Score sliders */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Reviewer Score Dimensions</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">Blended:</span>
                      <span className="font-mono font-bold text-base" style={{ color: "#F6821F" }}>{blendedScore}/100</span>
                    </div>
                  </div>
                  <div className="space-y-3.5">
                    {SCORE_DIMS.map(d => (
                      <ScoreSlider
                        key={d.key}
                        label={d.label}
                        hint={d.hint}
                        value={scores[d.key as keyof typeof scores]}
                        onChange={v => setScores(s => ({ ...s, [d.key]: v }))}
                      />
                    ))}
                  </div>
                  <div className="mt-3 p-3 rounded-xl flex items-center justify-between"
                    style={{ background: "linear-gradient(135deg, #FFF8F1, #FEF3E2)", border: "1px solid rgba(246,130,31,0.2)" }}>
                    <div className="text-xs text-gray-500">Auto-score (60%) + Reviewer (40%)</div>
                    <div className="font-mono font-bold text-lg" style={{ color: "#16A34A" }}>
                      {review.score} × 0.6 + {reviewerScore} × 0.4 = <span style={{ color: "#F6821F" }}>{blendedScore}</span>
                    </div>
                  </div>
                </div>

                {/* Star rating */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Overall Quality Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s}
                        onClick={() => setStars(s)}
                        onMouseEnter={() => setHoverStar(s)}
                        onMouseLeave={() => setHoverStar(0)}
                        className="focus:outline-none transition-transform hover:scale-125 active:scale-110">
                        <Star className={`w-7 h-7 transition-colors ${s <= (hoverStar || stars) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                      </button>
                    ))}
                    {stars > 0 && <span className="text-sm font-bold text-gray-500 ml-2 self-center">
                      {["", "Poor", "Fair", "Good", "Great", "Excellent"][stars]}
                    </span>}
                  </div>
                </div>

                {/* Checklist */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Approval Checklist</label>
                  <div className="space-y-2">
                    {checklistItems.map((item, i) => (
                      <label key={i} className="flex items-center gap-2.5 text-sm font-medium text-gray-700 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checklist[i]}
                          onChange={e => setChecklist(c => c.map((v, idx) => idx === i ? e.target.checked : v))}
                          className="w-4 h-4 rounded cursor-pointer"
                          style={{ accentColor: "#F6821F" }}
                        />
                        <span className={checklist[i] ? "text-gray-800" : "text-gray-400"}>{item}</span>
                        {checklist[i] && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
                      </label>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] text-gray-400">
                    {checklist.filter(Boolean).length}/{checklist.length} checked
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Feedback for Candidate</label>
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Provide constructive feedback on this submission…"
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none transition-all"
                    style={{ background: "#FAFAFA" }}
                    onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 3px rgba(246,130,31,0.15)"}
                    onBlur={e => e.currentTarget.style.boxShadow = ""}
                  />
                </div>

                {/* Escrow info */}
                <div className="rounded-xl p-3.5 flex items-start gap-3"
                  style={{ background: "hsl(224 25% 15%)", border: "1px solid hsl(224 18% 22%)" }}>
                  <Coins className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#F6821F" }} />
                  <div>
                    <div className="text-xs font-bold mb-0.5" style={{ color: "hsl(40 18% 88%)" }}>
                      Escrow Release on Approval
                    </div>
                    <div className="text-[11px]" style={{ color: "hsl(224 12% 55%)" }}>
                      Approving will unlock{" "}
                      <span className="font-mono font-bold text-green-400">₹{review.escrowAmount.toLocaleString()}</span>
                      {" "}to {review.candidate} via Polygon smart contract. This cannot be undone.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 space-y-2 flex-shrink-0">
                {releasing ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-4 gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-8 h-8 border-2 border-t-transparent rounded-full"
                      style={{ borderColor: "#F6821F", borderTopColor: "transparent" }}
                    />
                    <div className="text-sm font-bold" style={{ color: "#F6821F" }}>
                      Releasing ₹{review.escrowAmount.toLocaleString()} to {review.candidate}…
                    </div>
                    <div className="text-[11px] text-gray-400">Broadcasting to Polygon blockchain</div>
                  </motion.div>
                ) : decision === "approve" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-3 py-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-green-700">Approved & Escrow Released!</div>
                      <div className="text-[11px] text-gray-400">₹{review.escrowAmount.toLocaleString()} sent to {review.candidate}</div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDecision("reject")}
                        className="flex-1 border-2 border-red-200 text-red-600 font-bold py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                      <button
                        onClick={() => handleDecision("revision")}
                        className="flex-1 border-2 border-amber-200 text-amber-700 font-bold py-2.5 rounded-xl hover:bg-amber-50 transition-colors text-sm flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-4 h-4" /> Request Revision
                      </button>
                    </div>
                    <button
                      onClick={() => handleDecision("approve")}
                      className="w-full text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2 shadow-md"
                      style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Approve & Release ₹{review.escrowAmount.toLocaleString()} Escrow
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

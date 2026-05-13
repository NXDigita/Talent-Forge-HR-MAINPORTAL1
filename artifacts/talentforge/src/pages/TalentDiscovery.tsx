import React, { useState } from "react";
import { Link } from "wouter";
import { CANDIDATES } from "@/data/mockData";
import { Search, GitCompare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CandidateCompareModal } from "@/components/talent/CandidateCompareModal";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

export function TalentDiscovery() {
  const [search, setSearch] = useState("");
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [compareOpen, setCompareOpen] = useState(false);

  const filtered = CANDIDATES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.domain.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  const compareList = CANDIDATES.filter(c => compareIds.has(c.id));

  return (
    <div className="flex gap-6 h-full pb-28">
      {/* Filters sidebar */}
      <div className="w-64 shrink-0 bg-white/80 border rounded-2xl p-5 backdrop-blur-xl h-fit sticky top-24 hidden lg:block shadow-sm">
        <h3 className="font-semibold mb-4 text-gray-800">Filters</h3>
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Domain</label>
            <div className="space-y-2">
              {['ECE', 'EEE', 'CS', 'Mechanical', 'DS', 'Robotics', 'Cloud', 'AI/ML', 'Civil'].map(d => (
                <label key={d} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" className="rounded accent-orange-500" /> {d}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Tier</label>
            <div className="space-y-2">
              {['Apprentice', 'Practitioner', 'Expert', 'Master'].map(t => (
                <label key={t} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" className="rounded accent-orange-500" /> {t}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Availability</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded accent-orange-500" defaultChecked /> Available Now
              </label>
            </div>
          </div>
          <button className="w-full py-2 rounded-lg font-bold text-sm transition-colors text-white" style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-6 min-w-0">
        {/* Search bar */}
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4 sticky top-16 z-20">
          <Search className="text-muted-foreground w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name, skill, domain..."
            className="flex-1 outline-none text-sm min-w-0"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-3">
            {compareIds.size > 0 && (
              <button
                onClick={() => setCompareOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all text-white"
                style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}
              >
                <GitCompare className="w-3.5 h-3.5" />
                Compare {compareIds.size}
              </button>
            )}
            <div className="text-sm text-muted-foreground font-medium">{filtered.length} found</div>
          </div>
        </div>

        {/* Candidate grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((candidate, i) => {
            const isSelected = compareIds.has(candidate.id);
            const isDisabled = !isSelected && compareIds.size >= 3;
            return (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group relative"
                style={isSelected ? { borderColor: '#F6821F', boxShadow: '0 0 0 2px rgba(246,130,31,0.2), 0 4px 16px rgba(0,0,0,0.08)' } : {}}
              >
                {/* Compare checkbox */}
                <button
                  onClick={() => toggleCompare(candidate.id)}
                  disabled={isDisabled}
                  title={isDisabled ? "Max 3 candidates" : isSelected ? "Remove from compare" : "Add to compare"}
                  className="absolute top-3 right-3 z-10 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all"
                  style={isSelected
                    ? { background: '#F6821F', borderColor: '#F6821F' }
                    : isDisabled
                      ? { background: '#F9FAFB', borderColor: '#E5E7EB', opacity: 0.4, cursor: 'not-allowed' }
                      : { background: 'white', borderColor: '#D1D5DB' }}
                >
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                <div className="flex items-start gap-3 mb-4 pr-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(246,130,31,0.8), rgba(217,119,6,0.9))' }}>
                    {initials(candidate.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{candidate.name}</h3>
                    <div className="text-xs text-muted-foreground">{candidate.city} · {candidate.domain}</div>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${candidate.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-3xl font-bold font-mono" style={{ color: '#8B5CF6' }}>{candidate.tfes}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">TFES Score</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-xs font-bold px-2 py-1 rounded inline-block uppercase tracking-wide"
                      style={{ background: 'rgba(246,130,31,0.1)', color: '#C2600A' }}>{candidate.tier}</div>
                    {candidate.aiMatch && (
                      <div className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded inline-block uppercase tracking-wide block">
                        {candidate.aiMatch}% Match
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {candidate.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{skill}</span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md">+{candidate.skills.length - 4}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/candidate/${candidate.id}`}
                    className="flex-1 text-center bg-gray-50 hover:bg-gray-100 border text-sm font-medium py-2 rounded-lg transition-colors">
                    View Profile
                  </Link>
                  <button className="flex-1 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}>
                    Invite
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating comparison bar */}
      <AnimatePresence>
        {compareIds.size >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
          >
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl"
              style={{ background: 'hsl(224 25% 15%)', border: '1px solid hsl(224 18% 25%)', backdropFilter: 'blur(12px)' }}>
              <GitCompare className="w-4 h-4 flex-shrink-0" style={{ color: '#F6821F' }} />
              <div className="flex items-center gap-2">
                {compareList.map(c => (
                  <div key={c.id} className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                    style={{ background: 'hsl(224 18% 22%)' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #F6821F, #D97706)' }}>
                      {initials(c.name)}
                    </div>
                    <span className="text-xs font-semibold text-white whitespace-nowrap hidden sm:block">{c.name.split(" ")[0]}</span>
                    <button onClick={() => toggleCompare(c.id)} className="ml-0.5 hover:text-red-400 transition-colors" style={{ color: 'hsl(224 12% 55%)' }}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {compareIds.size < 3 && (
                  <div className="px-2 py-1 rounded-lg border border-dashed text-xs font-medium"
                    style={{ borderColor: 'hsl(224 15% 30%)', color: 'hsl(224 12% 50%)' }}>
                    + {3 - compareIds.size} more
                  </div>
                )}
              </div>
              <div className="w-px h-6 mx-1" style={{ background: 'hsl(224 15% 25%)' }} />
              <button
                onClick={() => setCompareOpen(true)}
                disabled={compareIds.size < 2}
                className="text-sm font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white"
                style={compareIds.size >= 2 ? { background: 'linear-gradient(135deg, #F6821F, #D97706)' } : { background: 'hsl(224 18% 25%)' }}
              >
                Compare {compareIds.size >= 2 ? "Now" : `(need ${2 - compareIds.size} more)`}
              </button>
              <button onClick={() => setCompareIds(new Set())} className="text-xs font-medium hover:text-red-400 transition-colors ml-1" style={{ color: 'hsl(224 12% 50%)' }}>
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare modal */}
      <CandidateCompareModal
        candidates={compareList}
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
      />
    </div>
  );
}

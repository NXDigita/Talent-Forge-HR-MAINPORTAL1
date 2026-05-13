import React, { useState } from "react";
import { Link } from "wouter";
import { CANDIDATES } from "@/data/mockData";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function TalentDiscovery() {
  const [search, setSearch] = useState("");
  
  const filtered = CANDIDATES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.domain.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex gap-6 h-full">
      <div className="w-64 shrink-0 bg-white/80 border rounded-2xl p-5 backdrop-blur-xl h-fit sticky top-24 hidden lg:block">
        <h3 className="font-semibold mb-4">Filters</h3>
        {/* Simplified filters for mock */}
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Domain</label>
            <div className="space-y-2">
              {['ECE', 'EEE', 'CS', 'Mechanical'].map(d => (
                <label key={d} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" /> {d}
                </label>
              ))}
            </div>
          </div>
          <button className="w-full bg-primary/10 text-primary py-2 rounded font-medium text-sm">Apply Filters</button>
        </div>
      </div>
      
      <div className="flex-1 space-y-6">
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4 sticky top-16 z-20">
          <Search className="text-muted-foreground w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, skill, domain..." 
            className="flex-1 outline-none text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="text-sm text-muted-foreground font-medium">{filtered.length} found</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((candidate, i) => (
            <motion.div key={candidate.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                    {candidate.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{candidate.name}</h3>
                    <div className="text-xs text-muted-foreground">{candidate.city} · {candidate.domain}</div>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${candidate.available ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-3xl font-bold font-mono text-secondary">{candidate.tfes}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">TFES Score</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded mb-1 inline-block uppercase tracking-wide">{candidate.tier}</div>
                  {candidate.aiMatch && <div className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded inline-block uppercase tracking-wide block">{candidate.aiMatch}% Match</div>}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                {candidate.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{skill}</span>
                ))}
                {candidate.skills.length > 4 && <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md">+{candidate.skills.length - 4}</span>}
              </div>
              
              <div className="flex gap-2">
                <Link href={`/candidate/${candidate.id}`} className="flex-1 text-center bg-gray-50 hover:bg-gray-100 border text-sm font-medium py-2 rounded-lg transition-colors">
                  View Profile
                </Link>
                <button className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                  Invite
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

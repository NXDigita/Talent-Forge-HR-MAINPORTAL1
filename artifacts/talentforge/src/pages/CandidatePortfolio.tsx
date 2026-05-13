import React from "react";
import { useParams } from "wouter";
import { CANDIDATES } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip as RechartsTooltip } from 'recharts';
import { motion } from "framer-motion";
import { ExternalLink, MessageSquare, Briefcase } from "lucide-react";

export function CandidatePortfolio() {
  const params = useParams();
  const candidate = CANDIDATES.find(c => c.id === params.id) || CANDIDATES[0];

  const radarData = [
    { subject: 'Technical', A: candidate.scores.technical, fullMark: 100 },
    { subject: 'Domain', A: candidate.scores.domain, fullMark: 100 },
    { subject: 'Problem Solving', A: candidate.scores.problem, fullMark: 100 },
    { subject: 'Communication', A: candidate.scores.comms, fullMark: 100 },
    { subject: 'Collaboration', A: candidate.scores.collab, fullMark: 100 },
    { subject: 'Consistency', A: candidate.scores.consistency, fullMark: 100 },
  ];

  const lineData = candidate.progression.map((val, i) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return { name: months[i], score: val };
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-4xl shadow-inner border-4 border-white/10">
            {candidate.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-extrabold tracking-tight">{candidate.name}</h1>
              <span className="bg-purple-500/20 text-purple-200 border border-purple-500/30 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{candidate.tier}</span>
            </div>
            <div className="text-indigo-200 font-medium text-lg mb-3">{candidate.domain} · {candidate.specialization}</div>
            <div className="flex items-center gap-3 text-sm text-indigo-300">
              <span>{candidate.city}</span> • <span>{candidate.college}</span>
              {candidate.available && <span className="flex items-center gap-1.5 text-green-400 font-semibold"><span className="w-2 h-2 rounded-full bg-green-400"></span> Available Now</span>}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 relative z-10 bg-black/20 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <div className="text-center">
            <div className="text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-purple-300 to-purple-500">{candidate.tfes}</div>
            <div className="text-xs uppercase font-bold tracking-widest text-indigo-200 mt-1">TFES Score</div>
            <div className="text-xs text-green-400 font-medium mt-2">↑ +5 pts this month</div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">AI-Generated Engineering Summary</h3>
            <p className="text-sm leading-relaxed text-gray-700 mb-4">
              Highly skilled {candidate.specialization} engineer with consistent track record in simulation environments. 
              Shows exceptional proficiency in {candidate.skills.slice(0, 2).join(' and ')}, routinely delivering 
              bug-free, optimized code under time constraints. Strong performance across technical domains, 
              showing particular aptitude in problem-solving architecture.
            </p>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map(s => <span key={s} className="bg-gray-100 border px-3 py-1.5 text-xs rounded-lg font-semibold text-gray-700">{s}</span>)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border text-center shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-1">{candidate.simulations.length}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-2">Simulations</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border text-center shadow-sm">
              <div className="text-4xl font-bold font-mono text-green-600 mb-1">{candidate.projects}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-2">Projects Delivered</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border text-center shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-1">{candidate.badges.length}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-2">NFT Credentials</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">Skill Radar</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 600 }} />
                <Radar name="Candidate" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <Tabs defaultValue="progression" className="w-full">
          <div className="px-6 border-b border-gray-100 bg-gray-50/50">
            <TabsList className="bg-transparent h-14 p-0">
              <TabsTrigger value="progression" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold px-4">Score History</TabsTrigger>
              <TabsTrigger value="simulations" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold px-4">Simulations</TabsTrigger>
              <TabsTrigger value="badges" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold px-4">NFT Credentials</TabsTrigger>
              <TabsTrigger value="reviews" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold px-4">Peer Reviews</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 min-h-[400px]">
            <TabsContent value="progression" className="m-0 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} domain={[40, 100]} />
                  <RechartsTooltip cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <ReferenceLine y={80} stroke="#9CA3AF" strokeDasharray="3 3" label={{ position: 'top', value: 'Practitioner Threshold', fill: '#9CA3AF', fontSize: 10 }} />
                  <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#fff', stroke: '#8B5CF6', strokeWidth: 2 }} animationDuration={800} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="simulations" className="m-0">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-tl-lg">Project</th>
                    <th className="px-4 py-3 font-semibold">Domain</th>
                    <th className="px-4 py-3 font-semibold text-center">Score</th>
                    <th className="px-4 py-3 font-semibold">Result</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {candidate.simulations.map((sim, i) => (
                    <motion.tr key={sim.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 font-bold text-gray-900">{sim.project}</td>
                      <td className="px-4 py-4 text-gray-500">{sim.domain}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`font-mono font-bold px-2 py-1 rounded text-xs ${sim.score >= 85 ? 'bg-green-100 text-green-700' : sim.score >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                          {sim.score}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-700 text-xs font-medium">{sim.result}</td>
                      <td className="px-4 py-4 text-gray-500 text-xs">{sim.date}</td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${sim.status === 'minted' ? 'text-green-600' : 'text-amber-600'}`}>
                          {sim.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="badges" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidate.badges.map((badge, i) => (
                  <motion.div key={badge.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} 
                    className="flex items-center justify-between p-5 border rounded-2xl bg-gradient-to-r from-white to-purple-50/30 shadow-sm hover:shadow-md transition-all group">
                    <div>
                      <div className="font-bold text-gray-900 mb-1">{badge.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="font-mono text-xs text-gray-400">{badge.hash}</div>
                        <a href="#" className="text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink className="w-3 h-3" /></a>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-2xl font-black text-purple-600">{badge.score}<span className="text-sm text-purple-300 font-medium">/100</span></div>
                      <div className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Polygon PoS ✓</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="m-0 space-y-4">
              {candidate.reviews.map((review, i) => (
                <div key={i} className="p-5 border rounded-2xl bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{review.reviewer.charAt(0)}</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{review.reviewer}</div>
                        <div className="text-xs text-gray-500">{review.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-amber-400 text-sm mb-1">{"★".repeat(Math.floor(review.rating))}</div>
                      <div className="text-xs text-gray-400">{review.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl italic">"{review.comment}"</p>
                </div>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-[260px] right-0 p-4 bg-white/80 backdrop-blur-xl border-t z-50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="hidden lg:block">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-900">{candidate.name}</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">{candidate.tier}</span>
            <span className="text-gray-300">•</span>
            <span className="font-mono font-bold text-purple-600">TFES {candidate.tfes}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative hidden sm:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">₹</span>
            <input type="number" placeholder="Budget" className="w-32 pl-7 pr-3 py-2 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/50 outline-none" />
          </div>
          <button className="hidden sm:flex items-center justify-center w-10 h-10 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg font-bold shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2">
            <Briefcase className="w-4 h-4" /> Create Project & Invite
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, ChevronRight, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function Reviewer() {
  const [selectedStars, setSelectedStars] = useState(0);

  const pendingReviews = [
    { id: "r1", priority: "urgent", candidate: "Arjun K.", project: "ESP32 Milestone 2", due: "Today", score: 94 },
    { id: "r2", priority: "normal", candidate: "Priya S.", project: "Python Pipeline M1", due: "Tomorrow", score: 88 },
    { id: "r3", priority: "low", candidate: "Vikram R.", project: "CAD Assembly", due: "3 days", score: 82 }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="rounded-2xl p-8 text-white shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(224 25% 18%) 0%, hsl(224 25% 13%) 100%)' }}>
        {/* Orange accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #F6821F, #D97706)' }} />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold border-2" style={{ background: 'rgba(246,130,31,0.2)', borderColor: 'rgba(246,130,31,0.4)', color: '#F6821F' }}>MJ</div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'hsl(40 22% 92%)' }}>Meena Joshi</h1>
            <p className="font-medium" style={{ color: 'hsl(224 12% 60%)' }}>Senior Engineer · AutoSense Labs</p>
          </div>
        </div>
        <div className="flex gap-10">
          <div>
            <div className="text-4xl font-bold font-mono text-green-400">14</div>
            <div className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color: 'hsl(224 12% 55%)' }}>Reviews Done</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-mono" style={{ color: '#F6821F' }}>3</div>
            <div className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color: 'hsl(224 12% 55%)' }}>Pending</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Action Required <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{pendingReviews.length}</span>
        </h2>
        
        <div className="space-y-3">
          {pendingReviews.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} 
              className={`bg-white border p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all ${review.priority === 'urgent' ? 'border-l-4 border-l-red-500' : review.priority === 'normal' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-gray-300'}`}>
              
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0 ${review.priority === 'urgent' ? 'text-red-500' : review.priority === 'normal' ? 'text-amber-500' : 'text-gray-400'}`}>
                  {review.priority === 'urgent' ? <AlertCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${review.priority === 'urgent' ? 'bg-red-50 text-red-700' : review.priority === 'normal' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                      {review.priority === 'urgent' ? 'Urgent' : review.priority === 'normal' ? 'Review' : 'Pending'}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{review.project}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{review.candidate}</span> • Due: {review.due}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                <div className="text-center">
                  <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Auto-Score</div>
                  <div className="font-mono text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">{review.score}/100</div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-bold shadow transition-colors flex items-center gap-2">
                      Review Now <ChevronRight className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 h-[85vh] flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-1/2 bg-gray-50 border-r flex flex-col">
                      <div className="p-4 border-b bg-white">
                        <div className="font-bold text-lg mb-1">{review.project}</div>
                        <div className="text-sm text-gray-500">Submission by {review.candidate}</div>
                      </div>
                      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center border-4 border-green-200">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div>
                          <div className="text-2xl font-mono font-bold text-green-600 mb-2">{review.score}/100</div>
                          <div className="font-bold text-gray-900">CIE Auto-Evaluated</div>
                          <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">All 5 technical acceptance criteria passed. Code compiles without errors.</p>
                        </div>
                        <button className="mt-4 border bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">View Source Code</button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 bg-white flex flex-col">
                      <div className="p-6 border-b">
                        <h3 className="font-bold text-lg">Peer Review</h3>
                      </div>
                      <div className="p-6 flex-1 overflow-y-auto space-y-6">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Quality Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button key={star} onClick={() => setSelectedStars(star)} className="focus:outline-none transition-transform hover:scale-110">
                                <Star className={`w-8 h-8 ${star <= selectedStars ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Checklist</label>
                          <div className="space-y-3">
                            {["Functionality meets spec", "Code quality acceptable", "Documentation complete", "Performance optimized"].map((item, i) => (
                              <label key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked={i < 2} />
                                {item}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Feedback Comment</label>
                          <textarea className="w-full border rounded-lg p-3 text-sm min-h-[100px] resize-none outline-none focus:ring-2 focus:ring-primary/50" placeholder="Provide constructive feedback..."></textarea>
                        </div>
                      </div>
                      <div className="p-4 border-t bg-gray-50 flex gap-3">
                        <button className="flex-1 border bg-white text-red-600 font-bold py-2.5 rounded-lg hover:bg-red-50 transition-colors">Reject</button>
                        <button className="flex-1 bg-amber-500 text-white font-bold py-2.5 rounded-lg hover:bg-amber-600 transition-colors">Request Revision</button>
                        <button className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-md">Approve</button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Completed Reviews</h2>
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-600">Candidate</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Project</th>
                <th className="px-6 py-3 font-semibold text-gray-600 text-center">Score</th>
                <th className="px-6 py-3 font-semibold text-gray-600 text-center">Your Rating</th>
                <th className="px-6 py-3 font-semibold text-gray-600 text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3].map(i => (
                <tr key={i}>
                  <td className="px-6 py-4 font-medium text-gray-900">Ravi T.</td>
                  <td className="px-6 py-4 text-gray-600">React HR Dashboard</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-green-600">92</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3.5 h-3.5 fill-current" /> 5.0</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-green-100 text-green-700 font-bold text-xs px-2 py-1 rounded uppercase tracking-wide">Approved</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

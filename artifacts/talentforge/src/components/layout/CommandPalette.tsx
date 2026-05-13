import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, FileText, User, CreditCard, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

export function CommandPalette({ open, setOpen }: { open: boolean, setOpen: (o: boolean) => void }) {
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const runAction = (action: () => void) => {
    action();
    setOpen(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden max-w-2xl bg-white/80 backdrop-blur-xl border-white/50 shadow-2xl rounded-2xl">
        <div className="flex items-center px-4 border-b">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            autoFocus
            className="flex-1 py-4 bg-transparent outline-none text-lg text-gray-900 placeholder:text-gray-400"
            placeholder="Search candidates, projects, or actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-xs bg-gray-100 text-gray-500 font-bold px-2 py-1 rounded">ESC</div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          <div className="mb-4">
            <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest">Quick Actions</div>
            <div className="space-y-1">
              <button onClick={() => runAction(() => setLocation('/pipeline'))} className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-primary/5 group transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><FileText className="w-4 h-4" /></div>
                  <span className="font-medium text-gray-900">Post New Project</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => runAction(() => setLocation('/talent'))} className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-primary/5 group transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 text-teal-600 rounded-lg"><User className="w-4 h-4" /></div>
                  <span className="font-medium text-gray-900">Run AI Match</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => runAction(() => setLocation('/payments'))} className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-primary/5 group transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CreditCard className="w-4 h-4" /></div>
                  <span className="font-medium text-gray-900">Release Payment</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

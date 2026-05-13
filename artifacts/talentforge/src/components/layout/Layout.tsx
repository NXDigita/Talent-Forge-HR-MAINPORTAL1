import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Search, ClipboardList, FolderOpen, CreditCard, Star, Settings, Menu, X, Sparkles } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { NotificationCenter } from "./NotificationCenter";
import { AIMatchModal } from "../talent/AIMatchModal";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiMatchOpen, setAiMatchOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/talent", label: "Talent Discovery", icon: Search },
    { href: "/pipeline", label: "Hire Pipeline", icon: ClipboardList },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/payments", label: "Escrow & Payments", icon: CreditCard },
    { href: "/reviewer", label: "Reviewer Panel", icon: Star },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b" style={{ borderColor: 'hsl(224 18% 22%)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: 'hsl(28 92% 54%)', color: '#fff' }}>TF</div>
            <div>
              <div className="font-bold leading-tight" style={{ color: 'hsl(40 22% 92%)' }}>TalentForge</div>
              <div className="text-xs" style={{ color: 'hsl(224 12% 55%)' }}>HR Portal</div>
            </div>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" style={{ color: 'hsl(224 12% 55%)' }} /></button>
        </div>
        <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: 'hsl(224 18% 22%)', border: '1px solid hsl(224 15% 27%)' }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: 'hsl(28 92% 54%)', color: '#fff' }}>AL</div>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'hsl(40 22% 92%)' }}>AutoSense Labs</div>
            <div className="text-[10px] px-1.5 py-0.5 rounded-full inline-block mt-1 uppercase tracking-wider font-bold" style={{ color: '#4ade80', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)' }}>Employer Pro</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
                style={isActive
                  ? { background: 'rgba(246,130,31,0.15)', color: 'hsl(28 92% 65%)', borderLeft: '3px solid hsl(28 92% 54%)', fontWeight: 700 }
                  : { color: 'hsl(224 12% 60%)', fontWeight: 500, borderLeft: '3px solid transparent' }
                }
                onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.background = 'hsl(224 18% 21%)'; (e.currentTarget as HTMLDivElement).style.color = 'hsl(40 22% 88%)'; } }}
                onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'hsl(224 12% 60%)'; } }}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4" style={{ borderTop: '1px solid hsl(224 18% 22%)' }}>
        <div className="p-4 rounded-xl" style={{ background: 'hsl(224 18% 21%)', border: '1px solid hsl(224 15% 26%)' }}>
          <div className="text-sm font-medium mb-1" style={{ color: 'hsl(40 18% 80%)' }}>Active Projects: <span className="font-bold" style={{ color: 'hsl(28 92% 65%)' }}>3</span></div>
          <div className="text-sm font-medium mb-3" style={{ color: 'hsl(40 18% 80%)' }}>Pending Reviews: <span className="font-bold" style={{ color: 'hsl(37 88% 62%)' }}>7</span></div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'hsl(224 12% 50%)' }}>Escrow Held</div>
          <div className="font-mono font-bold text-xl" style={{ color: '#4ade80' }}>₹85,000</div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background w-full font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-[260px] hidden md:flex flex-col border-r sticky top-0 h-screen z-40" style={{ background: 'hsl(224 25% 16%)', borderColor: 'hsl(224 18% 22%)' }}>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="w-[280px] flex flex-col h-full relative shadow-2xl" style={{ background: 'hsl(224 25% 16%)' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 -ml-2 rounded-md hover:bg-gray-100" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-sm text-muted-foreground hidden lg:block font-medium">
              TalentForge <span className="mx-2 text-gray-300">/</span> <span className="text-gray-900 capitalize">{location.replace("/", "") || "Home"}</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <button onClick={() => setCmdOpen(true)} className="w-full flex items-center justify-between px-4 py-2 bg-gray-100/80 hover:bg-gray-200 border-transparent rounded-lg text-sm text-gray-500 transition-colors">
              <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Search candidates, projects...</span>
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <button
              onClick={() => setAiMatchOpen(true)}
              data-testid="btn-post-project-nav"
              className="hidden sm:flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all hover:shadow-md hover:-translate-y-px"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Match
            </button>
            <NotificationCenter />
            <div className="flex items-center gap-2 pl-2 md:border-l">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">RS</div>
              <span className="text-sm font-bold text-gray-900 hidden sm:block">Rahul S.</span>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
      
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
      <AIMatchModal open={aiMatchOpen} onClose={() => setAiMatchOpen(false)} />
    </div>
  );
}

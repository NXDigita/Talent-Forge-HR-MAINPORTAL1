import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Search, ClipboardList, FolderOpen, CreditCard, Star, Settings, Menu, X } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { NotificationCenter } from "./NotificationCenter";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-white font-bold">TF</div>
            <div>
              <div className="font-bold text-foreground leading-tight">TalentForge</div>
              <div className="text-xs text-muted-foreground">HR Portal</div>
            </div>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="bg-muted p-3 rounded-lg border border-border/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary text-white flex items-center justify-center font-bold">AL</div>
          <div>
            <div className="font-medium text-sm">AutoSense Labs</div>
            <div className="text-[10px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full inline-block mt-1 uppercase tracking-wider font-bold">Employer Pro</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 ${isActive ? "bg-primary/10 text-primary border-l-4 border-primary font-bold" : "text-muted-foreground font-medium hover:bg-muted hover:text-foreground hover:translate-x-1"}`}>
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border/50">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium mb-1 text-blue-900">Active Projects: 3</div>
          <div className="text-sm font-medium mb-1 text-blue-900">Pending Reviews: 7</div>
          <div className="text-xs text-blue-700/80 font-bold uppercase tracking-wider mt-3 mb-1">Escrow Held</div>
          <div className="font-mono text-green-600 font-bold text-xl">₹85,000</div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background w-full font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-[260px] hidden md:flex flex-col border-r bg-white/80 backdrop-blur-xl sticky top-0 h-screen z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="w-[280px] flex flex-col bg-white h-full relative shadow-2xl">
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
            <button className="hidden sm:block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
              + Post Project
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
    </div>
  );
}

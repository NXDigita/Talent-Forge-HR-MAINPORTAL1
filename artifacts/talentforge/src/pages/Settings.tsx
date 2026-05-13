import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User, Bell, CreditCard, Shield } from "lucide-react";

export function Settings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account, company profile, and billing</p>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        <Tabs defaultValue="profile" className="flex flex-col md:flex-row w-full" orientation="vertical">
          <TabsList className="flex md:flex-col justify-start items-start w-full md:w-64 h-auto rounded-none border-b md:border-b-0 md:border-r bg-gray-50/50 p-0 overflow-x-auto">
            <div className="p-4 hidden md:block w-full border-b border-gray-100">
              <div className="font-bold text-sm text-gray-500 uppercase tracking-widest">General</div>
            </div>
            <TabsTrigger value="profile" className="w-full justify-start py-3 px-6 rounded-none data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-primary flex gap-3"><Building2 className="w-4 h-4" /> Company</TabsTrigger>
            <TabsTrigger value="account" className="w-full justify-start py-3 px-6 rounded-none data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-primary flex gap-3"><User className="w-4 h-4" /> Account</TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start py-3 px-6 rounded-none data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-primary flex gap-3"><Bell className="w-4 h-4" /> Notifications</TabsTrigger>
            
            <div className="p-4 mt-4 hidden md:block w-full border-b border-gray-100">
              <div className="font-bold text-sm text-gray-500 uppercase tracking-widest">Payments</div>
            </div>
            <TabsTrigger value="billing" className="w-full justify-start py-3 px-6 rounded-none data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-primary flex gap-3"><CreditCard className="w-4 h-4" /> Billing & Plan</TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-start py-3 px-6 rounded-none data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-primary flex gap-3"><Shield className="w-4 h-4" /> Security</TabsTrigger>
          </TabsList>

          <div className="flex-1 p-8">
            <TabsContent value="profile" className="m-0 focus:outline-none">
              <div className="max-w-md space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Company Profile</h2>
                  <p className="text-sm text-gray-500">Update your company details and domain.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-2xl shadow-inner">AL</div>
                    <button className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Change Logo</button>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Company Name</label>
                      <input type="text" defaultValue="AutoSense Labs" className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Website</label>
                      <input type="url" defaultValue="https://autosenselabs.com" className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Industry</label>
                        <select className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none bg-white">
                          <option>IoT / Embedded</option>
                          <option>SaaS</option>
                          <option>Fintech</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Location</label>
                        <input type="text" defaultValue="Chennai, India" className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t flex justify-end">
                  <button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="m-0 focus:outline-none">
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Billing & Plan</h2>
                  <p className="text-sm text-gray-500">Manage your subscription and escrow funding methods.</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-block bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2">Current Plan</div>
                      <h3 className="text-2xl font-bold text-gray-900">Employer Pro</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">₹45k<span className="text-sm font-medium text-gray-500">/mo</span></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Unlimited active projects
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Priority AI matching
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Dedicated account manager
                    </div>
                  </div>
                  
                  <button className="bg-white border shadow-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">Manage Subscription</button>
                </div>

                <div className="border rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Funding Source</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold italic">VISA</div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">•••• •••• •••• 4242</div>
                        <div className="text-xs text-gray-500">Expires 12/26</div>
                      </div>
                    </div>
                    <button className="text-sm text-primary font-medium hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="account">Account Settings (Placeholder)</TabsContent>
            <TabsContent value="notifications">Notification Settings (Placeholder)</TabsContent>
            <TabsContent value="security">Security Settings (Placeholder)</TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export function NotificationCenter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0 rounded-xl shadow-xl bg-white/90 backdrop-blur-xl border-white/50">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-gray-900">Notifications</h3>
          <button className="text-xs text-primary font-medium hover:underline">Mark all read</button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="p-4 border-b hover:bg-gray-50 cursor-pointer flex gap-3">
            <div className="mt-1 flex-shrink-0 text-green-500"><CheckCircle2 className="w-4 h-4" /></div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">Arjun K. submitted Milestone 2</div>
              <div className="text-xs text-gray-500">ESP32 IoT Dashboard project is ready for your review.</div>
              <div className="text-[10px] text-gray-400 mt-2 font-bold uppercase">2 hours ago</div>
            </div>
            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#F6821F' }}></div>
          </div>
          <div className="p-4 border-b hover:bg-gray-50 cursor-pointer flex gap-3">
            <div className="mt-1 flex-shrink-0" style={{ color: '#F6821F' }}><MessageSquare className="w-4 h-4" /></div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">New message from Priya S.</div>
              <div className="text-xs text-gray-500">"I've updated the Python pipeline according to the specs."</div>
              <div className="text-[10px] text-gray-400 mt-2 font-bold uppercase">5 hours ago</div>
            </div>
            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#F6821F' }}></div>
          </div>
          <div className="p-4 hover:bg-gray-50 cursor-pointer flex gap-3">
            <div className="mt-1 flex-shrink-0 text-amber-500"><AlertCircle className="w-4 h-4" /></div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">Escrow funding required</div>
              <div className="text-xs text-gray-500">Milestone 1 for "Load Flow Analysis" needs to be funded.</div>
              <div className="text-[10px] text-gray-400 mt-2 font-bold uppercase">1 day ago</div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t bg-gray-50 text-center">
          <button className="text-xs font-bold text-gray-600 hover:text-gray-900">View All Notifications</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

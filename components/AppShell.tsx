"use client";

import React from "react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-40 md:hidden ${mobileOpen ? "" : "hidden"}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow">
          <Sidebar onQuickAdd={() => { setMobileOpen(false); }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

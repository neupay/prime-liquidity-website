"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineViewGrid, HiOutlineDocumentText, HiOutlineCog, HiOutlineLogout, HiOutlineUsers } from "react-icons/hi";

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Overview", href: "/dashboard/agent", icon: <HiOutlineViewGrid className="w-5 h-5" /> },
    { name: "Applications", href: "/dashboard/agent/applications", icon: <HiOutlineDocumentText className="w-5 h-5" /> },
    { name: "Customers", href: "/dashboard/agent/customers", icon: <HiOutlineUsers className="w-5 h-5" /> },
    { name: "Settings", href: "/dashboard/agent/settings", icon: <HiOutlineCog className="w-5 h-5" /> },
  ];

  // Function to determine if a nav item is active
  const isActive = (href: string) => {
    if (!mounted) return false;
    
    // Exact match for root
    if (href === "/dashboard/agent") {
      return pathname === href;
    }
    // For other routes, check if pathname starts with the href
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <header className="w-full bg-[#0f172a] text-white flex items-center justify-between px-6 py-2 shadow-md">
        {/* Logo on the left - made larger */}
        <div className="flex items-center gap-4">
          <img 
            src="/images/prime-logo.png" 
            alt="Prime Liquidity Logo" 
            className="h-21 w-auto" /* Increased from h-10 to h-14 */
          />
          {/* <span className="text-2xl font-semibold text-white hidden sm:inline-block">
            Prime Liquidity
          </span> */}
        </div>

        {/* User info on the right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-xl font-bold uppercase">
              EJ
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-base">Elijah Johnson</p>
              <p className="text-xs text-slate-400">Agent</p>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex">
        {/* NAVY SIDEBAR */}
        <aside className={`bg-[#0f172a] text-white flex flex-col transition-all duration-200 relative ${collapsed ? 'w-20' : 'w-64'}`}>
          {/* COLLAPSE BUTTON */}
          <div className={`relative p-6 border-b border-slate-700 flex items-center justify-between ${collapsed ? 'px-2 py-4' : ''}`}>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-white">Agent Portal</h2>
                {/* <p className="text-xs text-slate-400 mt-1">Navigation</p> */}
              </div>
            )}
            <button
              onClick={() => setCollapsed((c) => !c)}
              className={`bg-slate-800 hover:bg-slate-700 text-white rounded-full p-1.5 focus:outline-none transition-all ${collapsed ? 'mx-auto' : ''}`}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className={`w-5 h-5 transition-transform ${collapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium group
                    ${collapsed ? 'justify-center px-2' : ''}
                    ${active 
                      ? 'bg-blue-900 text-white shadow-md' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                  title={item.name}
                >
                  {/* Active indicator bar */}
                  {active && !collapsed && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}
                  
                  {/* Icon with dynamic color */}
                  <span className={`
                    transition-colors duration-200
                    ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                  `}>
                    {item.icon}
                  </span>
                  
                  {/* Label */}
                  {!collapsed && (
                    <span className="flex-1">{item.name}</span>
                  )}
                  
                  {/* Small dot indicator for collapsed state */}
                  {collapsed && active && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <div className="p-4 border-t border-slate-700">
            <button 
              className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200 font-medium group ${collapsed ? 'justify-center px-2' : ''}`}
              title="Logout"
              onClick={() => {
                // Add logout logic here
                console.log("Logout clicked");
              }}
            >
              <HiOutlineLogout className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
import React, { useState, useMemo } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import { DashboardRoleProvider, useDashboardRole } from "../state/dashboardRoleContext";

const DrawerLayout = ({ variant }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { isAdmin, activeView } = useDashboardRole();

  const effectiveVariant = useMemo(() => {
    if (!isAdmin) return "student";
    return variant || (activeView === "admin" ? "admin" : "student");
  }, [isAdmin, activeView, variant]);

  return (
    <div className="min-h-screen bg-brand-bg flex overflow-hidden">
      {/* 1. DESKTOP SIDEBAR: Fixed width, hidden on mobile */}
      <aside className="hidden lg:flex lg:flex-shrink-0 lg:w-72 h-screen sticky top-0 border-r border-gray-100">
        <Sidebar variant={effectiveVariant} />
      </aside>

      {/* 2. MOBILE SIDEBAR: Animated Drawer & Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Backdrop Overlay */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)} 
        />
        
        {/* Slide-in Menu */}
        <div className={`absolute left-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar variant={effectiveVariant} onNavigate={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* 3. MAIN CONTENT AREA: Scrollable */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden">
        <HeaderBar
          variant={effectiveVariant}
          onOpenSidebar={() => setSidebarOpen(true)}
          searchValue={search}
          onSearchChange={setSearch}
        />
        
        <main className="flex-1 relative focus:outline-none">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
            <Outlet context={{ dashboardSearch: search, dashboardVariant: effectiveVariant }} />
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardLayout = ({ variant }) => {
  return (
    <DashboardRoleProvider>
      <DrawerLayout variant={variant} />
    </DashboardRoleProvider>
  );
};

export default DashboardLayout;
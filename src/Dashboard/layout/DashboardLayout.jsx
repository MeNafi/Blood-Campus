import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import { DashboardRoleProvider, useDashboardRole } from "../state/dashboardRoleContext";

const DrawerLayout = ({ variant }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { isAdmin, activeView } = useDashboardRole();

  const effectiveVariant = React.useMemo(() => {
    if (!isAdmin) return "student";
    return variant || (activeView === "admin" ? "admin" : "student");
  }, [isAdmin, activeView, variant]);

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="flex">
        <div className="hidden h-screen w-72 lg:block">
          <Sidebar variant={effectiveVariant} />
        </div>

        {sidebarOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/30"
              aria-label="Close sidebar overlay"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 shadow-2xl">
              <Sidebar variant={effectiveVariant} onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <HeaderBar
            variant={effectiveVariant}
            onOpenSidebar={() => setSidebarOpen(true)}
            searchValue={search}
            onSearchChange={setSearch}
          />
          <main className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
            <Outlet context={{ dashboardSearch: search, dashboardVariant: effectiveVariant }} />
          </main>
        </div>
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


import React from "react";
import { NavLink, Outlet } from "react-router";

const tabs = [
  { to: "/dashboard/settings/profile", label: "Profile", end: true },
  { to: "/dashboard/settings/account", label: "Account" },
  { to: "/dashboard/settings/security", label: "Security" },
];

const SettingsShell = () => {
  return (
    <section className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your profile, account preferences, and security.
        </p>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Desktop Sidebar Tabs (Visible only on LG screens) */}
        <div className="hidden lg:block lg:col-span-3">
          <nav className="flex flex-col gap-2 sticky top-6">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                    isActive 
                      ? "bg-white border border-gray-100 shadow-sm text-red-600" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile Tabs (Hidden on LG screens) */}
        <div className="lg:hidden col-span-12">
          <div className="tabs tabs-boxed w-full rounded-2xl bg-gray-50 p-1 flex">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  ["tab flex-1 rounded-xl text-sm font-bold", isActive ? "tab-active bg-white shadow-sm" : ""].join(" ")
                }
              >
                {t.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Main Settings Form/Content - Takes 9 columns on desktop, 12 on mobile */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 lg:p-10 shadow-sm">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default SettingsShell;
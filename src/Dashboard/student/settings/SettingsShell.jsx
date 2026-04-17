import React from "react";
import { NavLink, Outlet } from "react-router";

const tabs = [
  { to: "/dashboard/settings/profile", label: "Profile", end: true },
  { to: "/dashboard/settings/account", label: "Account" },
  { to: "/dashboard/settings/security", label: "Security" },
];

const SettingsShell = () => {
  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your profile, account preferences, and security.
        </p>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* We keep the mobile tabs for better UX on small screens */}
        <div className="lg:hidden col-span-12">
          <div className="tabs tabs-boxed w-full rounded-2xl bg-gray-50 p-1">
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

        {/* Main Settings Form/Content */}
        <div className="lg:col-span-12 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default SettingsShell;
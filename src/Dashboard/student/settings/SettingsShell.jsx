import React from "react";
import { NavLink, Outlet } from "react-router";
import { User, CreditCard, Shield } from "lucide-react";

const tabs = [
  { to: "/dashboard/settings/profile", label: "Profile", icon: User, end: true },
  { to: "/dashboard/settings/account", label: "Account", icon: CreditCard },
  { to: "/dashboard/settings/security", label: "Security", icon: Shield },
];

const TabLink = ({ to, label, icon: Icon, end }) => (
  <NavLink
    end={end}
    to={to}
    className={({ isActive }) =>
      [
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
        isActive ? "bg-primary text-white shadow-sm" : "text-gray-700 hover:bg-gray-50",
      ].join(" ")
    }
  >
    {({ isActive }) => (
      <>
        <span className={["flex h-9 w-9 items-center justify-center rounded-xl", isActive ? "bg-white/15" : "bg-gray-50"].join(" ")}>
          <Icon size={18} className={isActive ? "text-white" : "text-gray-700"} />
        </span>
        <span className="truncate">{label}</span>
      </>
    )}
  </NavLink>
);

const SettingsShell = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">Profile, account preferences, and security controls.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="hidden flex-col gap-1 lg:flex">
              {tabs.map((t) => (
                <TabLink key={t.to} {...t} />
              ))}
            </div>

            <div className="lg:hidden">
              <div className="tabs tabs-boxed w-full rounded-2xl bg-gray-50 p-1">
                {tabs.map((t) => (
                  <NavLink
                    key={t.to}
                    to={t.to}
                    end={t.end}
                    className={({ isActive }) =>
                      ["tab flex-1 rounded-xl text-sm font-bold", isActive ? "tab-active bg-white" : ""].join(" ")
                    }
                  >
                    {t.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default SettingsShell;


import React from "react";
import { NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  Droplet,
  History,
  Info,
  Settings,
  LineChart,
  Users,
  BadgeCheck,
  User,
  CreditCard,
  Shield,
  ChevronDown,
} from "lucide-react";

const studentItems = [
  { to: "/dashboard/find-blood", label: "Find Blood", icon: Droplet },
  { to: "/dashboard/donation-history", label: "Donation History", icon: History },
  { to: "/dashboard/about", label: "About", icon: Info },
];

const settingsItems = [
  { to: "/dashboard/settings/profile", label: "Profile", icon: User, end: true },
  { to: "/dashboard/settings/account", label: "Account", icon: CreditCard },
  { to: "/dashboard/settings/security", label: "Security", icon: Shield },
];

const adminItems = [
  { to: "/admin", label: "Analytics", icon: LineChart, end: true },
  { to: "/admin/donors", label: "Donors", icon: Users },
];

const Sidebar = ({ variant = "student", onNavigate }) => {
  const items = variant === "admin" ? adminItems : studentItems;
  const location = useLocation();

  // Logic to detect if the user is currently in settings
  const isSettingsPath = location.pathname.startsWith("/dashboard/settings");

  return (
    <aside className="flex h-full w-72 flex-col border-r border-gray-100 bg-white">
      <div className="px-5 pb-4 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">BloodCampus</p>
            <p className="mt-1 text-lg font-black text-gray-900">{variant === "admin" ? "Control Center" : "Student Dashboard"}</p>
          </div>
          <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary">
            {variant === "admin" ? "Admin" : "Student"}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 pb-6">
        <ul className="space-y-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                end={end}
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    isActive ? "bg-primary text-white shadow-sm" : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-lg",
                        isActive ? "bg-white/15" : "bg-gray-50 text-gray-600 group-hover:bg-white",
                      ].join(" ")}
                    >
                      <Icon size={18} className={isActive ? "text-white" : ""} />
                    </span>
                    <span className="truncate">{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}

          {variant !== "admin" ? (
            <li>
              <NavLink
                to="/dashboard/settings/profile"
                onClick={onNavigate}
                className={() =>
                  [
                    "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    isSettingsPath ? "bg-primary text-white shadow-sm" : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")
                }
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      isSettingsPath ? "bg-white/15" : "bg-gray-50 text-gray-600 group-hover:bg-white",
                    ].join(" ")}
                  >
                    <Settings size={18} className={isSettingsPath ? "text-white" : ""} />
                  </span>
                  <span className="truncate">Settings</span>
                </div>
                <ChevronDown size={16} className={`${isSettingsPath ? "rotate-180" : ""} transition-transform`} />
              </NavLink>

              {/* Collapsible Sub-menu with Skeleton/Hover effect */}
              {isSettingsPath && (
                <ul className="mt-1 space-y-1 pl-3">
                  {settingsItems.map(({ to, label, icon: ChildIcon, end }) => (
                    <li key={to}>
                      <NavLink
                        end={end}
                        to={to}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          [
                            "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                            isActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                          ].join(" ")
                        }
                      >
                        <span
                          className={[
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                            "bg-gray-50 text-gray-600 group-hover:bg-white", // The "skeleton" background look
                          ].join(" ")}
                        >
                          <ChildIcon size={16} />
                        </span>
                        <span className="truncate">{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : null}
        </ul>
      </nav>

      {variant !== "admin" ? (
        <div className="border-t border-gray-100 p-4">
          <div className="rounded-2xl bg-primary/5 p-4">
            <p className="text-sm font-bold text-gray-900">Need blood fast?</p>
            <p className="mt-1 text-xs text-gray-600">Search donors by hall/department and availability.</p>
            <NavLink to="/dashboard/find-blood" className="btn btn-sm mt-3 w-full rounded-xl border-none bg-primary text-white hover:bg-red-600">
              Open Donor Radar
            </NavLink>
          </div>
        </div>
      ) : null}
    </aside>
  );
};

export default Sidebar;
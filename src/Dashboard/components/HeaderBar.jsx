import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, Search, ChevronRight, LogOut, Shield, User2 } from "lucide-react";
import UseAuth from "../../Hook/UseAuth";
import { useDashboardRole } from "../state/dashboardRoleContext";

const segmentLabels = {
  dashboard: "Dashboard",
  "find-blood": "Find Blood",
  "donation-history": "Donation History",
  about: "About",
  settings: "Settings",
  admin: "Admin",
  donors: "Donors",
  verification: "Verification",
};

const getBreadcrumbs = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [];
  let accum = "";
  for (const part of parts) {
    accum += `/${part}`;
    crumbs.push({ label: segmentLabels[part] || part, to: accum });
  }
  return crumbs;
};

const HeaderBar = ({ onOpenSidebar, searchValue, onSearchChange, variant = "student" }) => {
  const { user, signOutUser } = UseAuth();
  const { isAdmin, activeView, setActiveView } = useDashboardRole();
  const location = useLocation();
  const navigate = useNavigate();

  const crumbs = React.useMemo(() => getBreadcrumbs(location.pathname), [location.pathname]);

  const handleLogout = async () => {
    await signOutUser();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="btn btn-ghost btn-sm rounded-xl lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <nav className="hidden min-w-0 items-center gap-2 text-sm text-gray-500 md:flex">
          {crumbs.map((c, idx) => (
            <div key={c.to} className="flex min-w-0 items-center gap-2">
              {idx === 0 ? null : <ChevronRight size={16} className="text-gray-300" />}
              <Link
                to={c.to}
                className={[
                  "truncate rounded-lg px-2 py-1 transition",
                  idx === crumbs.length - 1 ? "text-gray-900 font-semibold" : "hover:bg-gray-50",
                ].join(" ")}
              >
                {c.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          <div className="hidden w-full max-w-xl items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm sm:flex">
            <Search size={16} className="text-gray-400" />
            <input
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={variant === "admin" ? "Search donors, emails, departments..." : "Search donors by name, blood group, hall..."}
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>

          {isAdmin ? (
            <div className="hidden items-center gap-2 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm sm:flex">
              <button
                type="button"
                onClick={() => setActiveView("student")}
                className={[
                  "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                  activeView === "student" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                <User2 size={14} className="mr-1 inline" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setActiveView("admin")}
                className={[
                  "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                  activeView === "admin" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                <Shield size={14} className="mr-1 inline" />
                Admin
              </button>
            </div>
          ) : null}

          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost rounded-2xl px-3">
              <div className="text-left">
                <p className="max-w-[180px] truncate text-xs font-bold text-gray-900">{user?.displayName || user?.email || "Student"}</p>
                <p className="text-[11px] font-semibold text-gray-500">{isAdmin ? "Admin Account" : "Student Account"}</p>
              </div>
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-[1] mt-3 w-56 rounded-box bg-white p-2 text-gray-700 shadow">
              {isAdmin ? (
                <li>
                  <Link to={activeView === "admin" ? "/admin" : "/dashboard"}>Go to {activeView === "admin" ? "Admin" : "Student"} view</Link>
                </li>
              ) : (
                <li>
                  <Link to="/dashboard/settings">Settings</Link>
                </li>
              )}
              <li>
                <button type="button" onClick={handleLogout} className="text-red-600">
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;


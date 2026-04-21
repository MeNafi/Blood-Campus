import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../../assets/logo_Grp.png";
import UseAuth from "../../Hook/UseAuth";
import { Bell, Menu, Settings, LayoutDashboard, X } from "lucide-react";
import { ADMIN_EMAILS } from "../../config/adminConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOutUser, user } = UseAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Blood", path: "/find-donor" },
    { name: "Be A Donor", path: "/donor-register" },
  ];

  const isAdmin = ADMIN_EMAILS.includes(user?.email || "");
  const notifications = [
    "Welcome to BloodCampus.",
    "Use verified university mail for secure access.",
    "Emergency requests are prioritized in donor feed.",
  ];

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
        console.error("Logout Error:", err);
      });
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <nav className="navbar mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3">
        <div className="navbar-start gap-3">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn btn-ghost btn-sm lg:hidden text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="BloodCampus Logo" className="h-8 w-auto sm:h-10" />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 text-sm font-medium">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 transition ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="btn btn-sm btn-ghost rounded-full text-white hover:bg-white/10"
                aria-label="Open dashboard"
                title="Dashboard"
              >
                <LayoutDashboard size={18} />
              </Link>
              <Link
                to="/dashboard/settings"
                className="btn btn-sm btn-ghost rounded-full text-white hover:bg-white/10"
                aria-label="Open settings"
                title="Settings"
              >
                <Settings size={18} />
              </Link>
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-sm btn-ghost rounded-full text-white hover:bg-white/10">
                  <Bell size={18} />
                </button>
                <ul tabIndex={0} className="menu dropdown-content z-1 mt-3 w-72 rounded-box bg-white p-2 text-gray-700 shadow">
                  {notifications.map((note) => (
                    <li key={note}>
                      <span className="text-xs">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {isAdmin && (
                <Link to="/admin/dashboard" className="btn btn-sm rounded-full border border-white bg-primary text-white hover:bg-red-600">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn btn-sm rounded-full border-none bg-white text-primary hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm rounded-full border border-white bg-white text-primary hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-sm rounded-full border border-white bg-primary text-white hover:bg-red-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-white/20 bg-primary lg:hidden">
          <ul className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to="/dashboard/settings"
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                    }
                  >
                    Settings
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

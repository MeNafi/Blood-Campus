import React from "react";
import { Link, useNavigate } from "react-router";
import { IoSettingsOutline, IoPersonCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
// Replace this with your actual logo path
import logo from "../../assets/logo_Grp.png";
import UseAuth from "../../Hook/UseAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOutUser, user } = UseAuth();
  // Navigation links array
  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Profile", path: "/profile" },
    { name: "Find Blood", path: "/request" },
    { name: "About", path: "/about" },
    { name: "Be a Donor", path: "/donor-register" },
  ];
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        // It's better to use a Toast or custom Modal here
        // than a browser alert which pauses the UI.
        console.log("Logout Successful");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout Error:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <nav className="bg-[#e53935] px-6 py-3 md:px-12 flex items-center justify-between shadow-md">
      {/* Left: Logo and Brand Name */}
      <Link to={'/'} className="flex items-center gap-3">
        <img
          src={logo}
          alt="BloodCampus Logo"
          className="h-10" // Using filters to make logo white like the screenshot
        />
      </Link>

      {/* Middle: Navigation Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-white text-base font-semibold hover:opacity-80 transition-opacity"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right: Icons and Logout */}
      <div className="flex items-center gap-5">
        {/* Settings Icon */}
        {user && (
          <button className="text-white text-2xl hover:scale-110 transition-transform">
            <IoSettingsOutline />
          </button>
        )}

        {/* Profile Icon */}
        {user && (
          <button className="text-white text-3xl hover:scale-110 transition-transform">
            <IoPersonCircleOutline />
          </button>
        )}

        {/* Logout Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-[#e53935] px-5 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-gray-100 transition-colors"
          >
            <MdLogout className="text-lg" />
            Logout
          </button>
        ) : (
          <Link
            to={"/login"}
            className="flex items-center gap-2 bg-white text-[#e53935] px-5 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-gray-100 transition-colors"
          >
            <MdLogout className="text-lg" />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

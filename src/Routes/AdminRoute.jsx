import React from "react";
import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hook/UseAuth";
import Loading from "../components/Loading/Loading";
import { ADMIN_EMAILS } from "../config/adminConfig";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/admin/login" state={location.pathname} />;

  const isAdmin = ADMIN_EMAILS.includes(user?.email || "");
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;

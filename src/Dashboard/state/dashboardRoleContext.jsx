import React from "react";
import UseAuth from "../../Hook/UseAuth";
import { ADMIN_EMAILS } from "../../config/adminConfig";

const DashboardRoleContext = React.createContext(null);

export const DashboardRoleProvider = ({ children }) => {
  const { user } = UseAuth();
  const isAdmin = ADMIN_EMAILS.includes(user?.email || "");

  const [activeView, setActiveView] = React.useState(isAdmin ? "admin" : "student");

  React.useEffect(() => {
    if (!isAdmin) setActiveView("student");
  }, [isAdmin]);

  const value = React.useMemo(
    () => ({
      isAdmin,
      activeView,
      setActiveView,
    }),
    [isAdmin, activeView],
  );

  return <DashboardRoleContext value={value}>{children}</DashboardRoleContext>;
};

export const useDashboardRole = () => React.use(DashboardRoleContext);


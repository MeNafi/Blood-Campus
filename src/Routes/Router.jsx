import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Registration from "../Pages/Auth/Registration/Registration";
import Home from "../Pages/Home/Home/Home";
import DonorRegistration from "../Pages/DonorRegistration/DonorRegistration";
import PrivateRoute from "./PrivateRoute";
import FindDonor from "../Pages/FindDonor/FindDonor";
import DonorList from "../Pages/DonorList/DonorList";
import AdminLogin from "../Pages/Auth/AdminLogin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import UnableDonor from "../Pages/UnableDonor/UnableDonor";
import DashboardLayout from "../Dashboard/layout/DashboardLayout";
import FindBlood from "../Dashboard/student/pages/FindBlood";
import DonationHistory from "../Dashboard/student/pages/DonationHistory";
import About from "../Dashboard/student/pages/About";
import Settings from "../Dashboard/student/pages/Settings";
import AdminOverview from "../Dashboard/admin/pages/AdminOverview";
import DonorManagement from "../Dashboard/admin/pages/DonorManagement";
import VerificationQueue from "../Dashboard/admin/pages/VerificationQueue";
import { Navigate } from "react-router";
import Goodbye from "../Pages/Goodbye/Goodbye";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Registration,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/admin/login",
        Component: AdminLogin,
      },
      {
        path: "/goodbye",
        Component: Goodbye,
      },
      {
        path: "/admin/dashboard",
        element: <Navigate to="/admin" replace />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout variant="student" />
          </PrivateRoute>
        ),
        children: [
          { path: "find-blood", Component: FindBlood },
          { path: "donation-history", Component: DonationHistory },
          { path: "about", Component: About },
          {
            path: "settings",
            Component: Settings,
            children: [
              { index: true, element: <Navigate to="/dashboard/settings/profile" replace /> },
              { path: "profile", lazy: async () => ({ Component: (await import("../Dashboard/student/settings/tabs/ProfileTab")).default }) },
              { path: "account", lazy: async () => ({ Component: (await import("../Dashboard/student/settings/tabs/AccountTab")).default }) },
              { path: "security", lazy: async () => ({ Component: (await import("../Dashboard/student/settings/tabs/SecurityTab")).default }) },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <DashboardLayout variant="admin" />
          </AdminRoute>
        ),
        children: [
          { index: true, Component: AdminOverview },
          { path: "donors", Component: DonorManagement },
          { path: "verification", Component: VerificationQueue },
        ],
      },
      {
        path: "/donor-list",
        element: (
          <PrivateRoute>
            <DonorList />
          </PrivateRoute>
        ),
      },
      {
        path: "/find-donor",
        element: (
          <PrivateRoute>
            <FindDonor />
          </PrivateRoute>
        ),
      },
      {
        path: "/unable-donor",
        element: (
          <PrivateRoute>
            <UnableDonor />
          </PrivateRoute>
        ),
      },
      {
        path: "/donor-register",
        loader: async () => {
          const res = await fetch("/location.json");
          if (!res.ok) {
            throw new Error("faild to load data");
          }
          return res.json();
        },
        element: (
          <PrivateRoute>
            <DonorRegistration />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

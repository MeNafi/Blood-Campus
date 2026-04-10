import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Registration from "../Pages/Auth/Registration/Registration";
import Home from "../Pages/Home/Home/Home";
import DonorRegistration from "../Pages/donorRegistration/DonorRegistration";
import PrivateRoute from "./PrivateRoute";
import FindDonor from "../Pages/FindDonor/FindDonor";
import DonorList from "../Pages/DonorList/DonorList";
import AdminLogin from "../Pages/Auth/AdminLogin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import UnableDonor from "../Pages/UnableDonor/UnableDonor";

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
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/donor-list",
        element: <PrivateRoute>
          <DonorList />
        </PrivateRoute>
      },
      {
        path: "/find-donor",
        element: <PrivateRoute>
          <FindDonor />
        </PrivateRoute>,
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
            <DonorRegistration></DonorRegistration>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Registration from "../Pages/Auth/Registration/Registration";
import Home from "../Pages/Home/Home/Home";
import DonorRegistration from "../Pages/donorRegistration/DonorRegistration";
import PrivateRoute from "./PrivateRoute";
import FindDonor from "../Pages/FindDonor/FindDonor";

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
        path: "/find-donor",
        element: <PrivateRoute>
          <FindDonor></FindDonor>
        </PrivateRoute>
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

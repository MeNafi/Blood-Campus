import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Registration from "../Pages/Auth/Registration/Registration";
import Home from "../Pages/Home/Home/Home";
import DonorRegistration from "../Pages/donorRegistration/DonorRegistration";
import PrivateRoute from "./PrivateRoute";

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
        path: "/donor-register",
        element: (
          <PrivateRoute>
            <DonorRegistration></DonorRegistration>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

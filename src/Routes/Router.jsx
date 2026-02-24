import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home"; 
import Navbar from "../components/Navbar/Navbar"; 
import MainLayout from "../Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: ([
      {
        path: "/",
        element: <Home />,
      },
    ])
  },
]);

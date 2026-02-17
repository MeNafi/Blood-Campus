import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Registration from "../Pages/Auth/Registration/Registration";
import Home from "../Pages/Home/Home/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index:true,
        Component: Home,
      },
      {
        path:'/registration',
        Component: Registration
      },
      {
        path:'/login',
        Component: Login,
      }
    ]
  },
]);
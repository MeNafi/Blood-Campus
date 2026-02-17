import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Registration from "../Pages/Auth/Registration/Registration";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index:true,
        
      },
      {
        path:'/registration',
        Component: Registration
      }
    ]
  },
]);
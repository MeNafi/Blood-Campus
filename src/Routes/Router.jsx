import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Registration from "../Pages/Auth/Registration/Registration";
import Home from "../Pages/Home/Home/Home";
import DonorRegistration from "../Pages/donorRegistration/DonorRegistration";


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
        path:'/register',
        Component: Registration
      },
      {
        path:'/login',
        Component: Login,
      },
      {
        path:'/donor-register',
        Component: DonorRegistration,
        loader: async()=>{
          const res = await fetch("/location.json");
          if(!res.ok){
            throw new Error("faild to load data")
          }
          return res.json();
        }
      }
    ]
  },
]);
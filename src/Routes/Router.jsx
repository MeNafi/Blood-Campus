import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import Registration from "../Pages/Auth/Registration/Registration";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration></Registration>,
  },
]);
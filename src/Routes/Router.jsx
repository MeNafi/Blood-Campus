import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
]);
import { createHashRouter, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { publicPages } from "../pages";

const {
  PublicRoot,
  PublicHome: Home,
  PublicFeatures: Features,
  PublicContact: Contact,
  PublicRegister: Register,
  PublicLogin: Login,
} = publicPages;

const router = createHashRouter([
  {
    path: "/",
    element: <PublicRoot />,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login/:userType",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: <PrivateRoute notAuthPath="/login/user" />,
    errorElement: null,
  },
  {
    path: "/dashboard/owner",
    element: <PrivateRoute notAuthPath="/login/owner" />,
    errorElement: null,
  },
]);

export default router;

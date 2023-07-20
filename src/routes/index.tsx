import { createHashRouter, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { publicPages } from "../pages";

const { PublicRoot, PublicHome: Home } = publicPages;

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
        element: null,
      },
      {
        path: "contact",
        element: null,
      },
      {
        path: "login",
        element: null,
        children: [
          {
            index: true,
            element: <Navigate to="/login/user" />,
          },
          {
            path: "user",
            element: null,
          },
          {
            path: "owner",
            element: null,
          },
        ],
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

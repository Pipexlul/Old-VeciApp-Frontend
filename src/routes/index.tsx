import PrivateRoute from "./PrivateRoute";

import { createHashRouter, Navigate } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: null,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/home",
        element: null,
      },
      {
        path: "/login",
        element: null,
        children: [
          {
            index: true,
            element: <Navigate to={"/login/user"} />,
          },
          {
            path: "/:client",
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

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
            path: "/login/:client",
            element: null,
          },
        ],
      },
    ],
  },
]);

export default router;

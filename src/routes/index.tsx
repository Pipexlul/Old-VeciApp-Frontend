import { createHashRouter, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { publicPages, privatePages } from "../pages";

const {
  PublicRoot,
  PublicHome: Home,
  PublicFeatures: Features,
  PublicContact: Contact,
  PublicRegister: Register,
  PublicLogin: Login,
} = publicPages;

const {
  userPages: { UserDashboard },
} = privatePages;

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
        path: "login",
        element: <Navigate to="/login/user" />,
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
    path: "/user",
    element: <PrivateRoute userType="user" />,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <UserDashboard />,
        children: [
          {
            index: true,
            element: <p>home</p>,
          },
          {
            path: "messages",
            element: <p>messages</p>,
          },
        ],
      },
    ],
  },
  {
    path: "/owner",
    element: <PrivateRoute userType="owner" />,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <h1>Owner Dashboard</h1>,
      },
    ],
  },
]);

export default router;

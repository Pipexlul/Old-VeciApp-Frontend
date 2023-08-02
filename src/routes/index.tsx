import { createHashRouter, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import NotImplemented from "../components/helpers/NotImplemented";

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
  userPages: { UserDashboard, UserDashboardHome },
  ownerPages: { OwnerDashboard },
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
            element: <UserDashboardHome />,
          },
          {
            path: "messages",
            element: <NotImplemented />,
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
        element: <OwnerDashboard />,
        children: [
          {
            index: true,
            element: <NotImplemented />,
          },
          {
            path: "messages",
            element: <NotImplemented />,
          },
          {
            path: "products",
            element: <NotImplemented />,
          },
          {
            path: "settings",
            element: <NotImplemented />,
          },
        ],
      },
    ],
  },
]);

export default router;

import type PrivateRouteProps from "../types/props/PrivateRouteProps";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const isAuthenticated = true; // TODO: implement hook

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;

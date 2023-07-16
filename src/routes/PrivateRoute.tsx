import { Navigate, Outlet } from "react-router-dom";

import type PrivateRouteProps from "../types/props/PrivateRouteProps";

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const isAuthenticated = true; // TODO: implement hook

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

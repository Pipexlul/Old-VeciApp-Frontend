import { type PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps extends PropsWithChildren {
  notAuthPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const isAuthenticated = true; // TODO: implement hook

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export { type PrivateRouteProps };
export default PrivateRoute;

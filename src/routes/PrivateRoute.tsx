import { type PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps extends PropsWithChildren {
  userType: "user" | "owner";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ userType }) => {
  const isAuthenticated = true; // TODO: implement hook

  return isAuthenticated ? <Outlet /> : <Navigate to={`/login/${userType}`} />;
};

export { type PrivateRouteProps };
export default PrivateRoute;

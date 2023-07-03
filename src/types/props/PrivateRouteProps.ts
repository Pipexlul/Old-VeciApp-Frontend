import { type PropsWithChildren } from "react";

interface PrivateRouteProps extends PropsWithChildren {
  notAuthPath: string;
}

export default PrivateRouteProps;

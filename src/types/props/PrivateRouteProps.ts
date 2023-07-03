import React, { type PropsWithChildren } from "react";

interface PrivateRouteProps extends PropsWithChildren {
  path: string;
  element: React.ReactNode;
}

export default PrivateRouteProps;

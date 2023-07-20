import { Outlet } from "react-router-dom";

import PublicHeader from "../../components/layout/public/Header";
import PublicFooter from "../../components/layout/public/Footer";

import linkConfig from "../../config/navLinks";

const PublicRoot: React.FC = () => {
  return (
    <>
      <PublicHeader links={linkConfig.publicLinks} />
      <Outlet />
      <PublicFooter />
    </>
  );
};

export default PublicRoot;

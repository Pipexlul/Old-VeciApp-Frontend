import { Outlet } from "react-router-dom";

import PublicHeader from "../../components/layout/public/Header";

import linkConfig from "../../config/navLinks";

const PublicRoot: React.FC = () => {
  return (
    <>
      <PublicHeader links={linkConfig.publicLinks} />
      <Outlet />
      {/* <Footer /> */}
      <p>Public Footer</p>
    </>
  );
};

export default PublicRoot;

import { Outlet } from "react-router-dom";

const PublicRoot: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoot;

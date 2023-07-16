import { Outlet } from "react-router-dom";

const PublicRoot: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <h1>Public Header</h1>
      <Outlet />
      {/* <Footer /> */}
      <p>Public Footer</p>
    </>
  );
};

export default PublicRoot;

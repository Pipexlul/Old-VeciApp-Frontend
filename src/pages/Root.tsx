import { Outlet } from "react-router-dom";

import Navbar from "../components/Layout/Navbar";

const Root: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;

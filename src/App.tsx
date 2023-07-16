import { RouterProvider } from "react-router-dom";

import routerConfig from "./routes";

const App = () => {
  return <RouterProvider router={routerConfig} />;
};

export default App;

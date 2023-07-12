import { RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import routerConfig from "./routes";

const App = () => {
  return (
    <PrimeReactProvider>
      <RouterProvider router={routerConfig} />;
    </PrimeReactProvider>
  );
};

export default App;

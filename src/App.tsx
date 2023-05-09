import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <h1>Home</h1>,
      },
      {
        path: "/cliente",
        element: <h1>Cliente</h1>,
      },
      {
        path: "/propietario",
        element: <h1>Propietario</h1>,
      },
      {
        path: "/registro",
        element: <h1>Registro</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

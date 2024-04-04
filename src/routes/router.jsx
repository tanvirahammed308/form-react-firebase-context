import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "./../pages/Home";
import Product from "./../pages/Product";
import Cart from "./../pages/Cart";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

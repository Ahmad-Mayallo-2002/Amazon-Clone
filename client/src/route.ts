import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Wish from "./pages/Wish";
import SingleProduct from "./pages/SingleProduct";
import Orders from "./pages/Orders";
import SingleOrder from "./pages/SingleOrder";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";

const routerObject: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "help", Component: Help },
      { path: "cart", Component: Cart },
      { path: "wish", Component: Wish },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: SingleProduct },
      { path: "orders", Component: Orders },
      { path: "order/:id", Component: SingleOrder },
      { path: "*", Component: NotFound },
    ],
  },
];

export const router = createBrowserRouter(routerObject);

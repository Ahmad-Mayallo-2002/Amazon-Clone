import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wish from "./pages/Wish";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Orders from "./pages/Orders";
import SingleOrder from "./pages/SingleOrder";

const routerObject: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "cart", Component: Cart },
      { path: "wish", Component: Wish },
      { path: "products", Component: Products },
      { path: "product/:id", Component: SingleProduct },
      { path: "orders", Component: Orders },
      { path: "order/:id", Component: SingleOrder },
    ],
  },
];

export const router = createBrowserRouter(routerObject);

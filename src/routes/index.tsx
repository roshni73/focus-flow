import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Only import what you need
const Home = lazy(() => import("../views/Home"));
const About = lazy(() => import("../views/About"));
const Services = lazy(() => import("../views/Services"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/services",
    element: <Services />,
  },
]);
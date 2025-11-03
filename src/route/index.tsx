import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";



const Login = lazy(() => import("../views/login"));

// const UserTable = lazy(() => import("../views/user-table/user-table-page"));
// const Profile = lazy(() => import("../views/profile"));

const Home = lazy(() => import("../views/home"));
const AboutUs = lazy(() => import("../views/about"));
const NewsPage = lazy(() => import("../views/news"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "news", element: <NewsPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  // {
  //   path: "/app",
  //   element: <AppLayout />,
  //   children: [
  //     { index: true, element: <Dashboard /> },
  //     { path: "dashboard", element: <Dashboard /> },
  //     {
  //       path: "chart-page",
  //       element: (
  //         <RoleProtectedRoute allowedRoles={["admin"]}>
  //           <ChartPage />
  //         </RoleProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: "user-table",
  //       element: (
  //         <RoleProtectedRoute allowedRoles={["admin"]}>
  //           <UserTable />
  //         </RoleProtectedRoute>
  //       )
  //     },
  //     { path: "profile", element: <Profile /> },
  //   ],
  // },
  {
    path: "*",
    element: <Login />,
  },
]);
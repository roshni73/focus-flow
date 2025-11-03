// route/route.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RoleProtectedRoute from "./role-protected-route";

// Lazy load all components
const AppLayout = lazy(() => import("../layout/app-layout/app-layout"));
const SiteLayout = lazy(() => import("../layout/site-layout/site-layout"));

const Login = lazy(() => import("../views/login"));
const ForgotPassword = lazy(() => import("../views/forgot-password"));
const OtpAuth = lazy(() => import("../views/otp"));

const Dashboard = lazy(() => import("../views/dashboard"));
const ChartPage = lazy(() => import("../views/chart-page/chart-page"));
const UserTable = lazy(() => import("../views/user-table/user-table-page"));
const Profile = lazy(() => import("../views/profile"));

const Home = lazy(() => import("../views/home"));
const AboutUs = lazy(() => import("../views/about"));
const ServicesPage = lazy(() => import("../views/service"));
const NewsPage = lazy(() => import("../views/news"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "services", element: <ServicesPage /> },
      { path: "news", element: <NewsPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp",
    element: <OtpAuth />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "chart-page",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <ChartPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "user-table",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <UserTable />
          </RoleProtectedRoute>
        )
      },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);
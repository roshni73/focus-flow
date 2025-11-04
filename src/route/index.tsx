import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/protectedRoute";
import DashboardLayout from "../layout/dashboardLayout";

// Public routes
const Login = lazy(() => import("../views/login"));
const Home = lazy(() => import("../views/home"));

// Dashboard routes
const Dashboard = lazy(() => import("../views/dashboard"));
const Profile = lazy(() => import("../views/profile"));
const Charts = lazy(() => import("../views/charts"));
const UserManagement = lazy(() => import("../views/users"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // Protected dashboard routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "charts", element: <Charts /> },
      { path: "users", element: <UserManagement /> },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);
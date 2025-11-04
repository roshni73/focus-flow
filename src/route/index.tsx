import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/protectedRoute";
import DashboardLayout from "../layout/dashboardLayout";

const Login = lazy(() => import("../views/login"));
const Home = lazy(() => import("../views/home"));
const RoleSelection = lazy(() => import("../components/roleselection"));

const Dashboard = lazy(() => import("../views/dashboard"));
const Profile = lazy(() => import("../views/profile"));
const Charts = lazy(() => import("../views/charts"));
const UsersTable = lazy(() => import("../views/users"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/role-selection",
    element: <RoleSelection />,
  },
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
      { path: "users", element: <UsersTable /> },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);
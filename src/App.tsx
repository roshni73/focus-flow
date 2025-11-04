import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";
import { Toaster } from 'sonner';
import { router } from "./route";

export default function App() {
  return (
    <AntdApp>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AntdApp>
  );
}

import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";
import { router } from "./route";

export default function App() {
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}

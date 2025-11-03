import { App } from "antd";

export const useNotification = () => {
  const { message, notification } = App.useApp();

  return {
    message: {
      success: (content: string, duration?: number) =>
        message.success(content, duration),
      error: (content: string, duration?: number) =>
        message.error(content, duration),
      warning: (content: string, duration?: number) =>
        message.warning(content, duration),
      info: (content: string, duration?: number) =>
        message.info(content, duration),
    },
    notification: {
      success: (message: string, description?: string) =>
        notification.success({
          message,
          description,
          placement: "topRight",
          showProgress: true,
        }),
      error: (message: string, description?: string) =>
        notification.error({
          message,
          description,
          placement: "topRight",
          showProgress: true,
        }),
      warning: (message: string, description?: string) =>
        notification.warning({
          message,
          description,
          placement: "topRight",
          showProgress: true,
        }),
      info: (message: string, description?: string) =>
        notification.info({
          message,
          description,
          placement: "topRight",
          showProgress: true,
        }),
    },
  };
};

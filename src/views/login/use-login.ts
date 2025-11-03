import { useState } from "react";
import { z } from "zod";
import { loginSchema, type LoginFormData } from "./login.schema";
import { setCookie } from "../../utils/cookies";
import type { LoginResponse } from "./login.types";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNotification } from "../../utils/notification";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { notification } = useNotification();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);

    if (result.success && result.user) {
      navigate("/auth/otp");
    } else {
      notification.error(result.message);
    }
  };

  const login = async (data: LoginFormData): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      if (
        data.email === "admin@example.com" &&
        data.password === "Password@123"
      ) {
        const userData = {
          id: "",
          name: data.name,
          email: data.email,
          password: data.password,
          role: "admin" as const,
        };

        setCookie("auth_name", String(userData.name));
        setCookie("auth_email", userData.email);
        setCookie("auth_role", userData.role);

        setLoading(false);
        return {
          success: true,
          message: "Admin login successful",
          user: userData,
        };
      }

      if (
        data.email === "user@example.com" &&
        data.password === "Password@123"
      ) {
        const userData = {
          id: "",
          name: data.name,
          email: data.email,
          password: data.password,
          role: "user" as const,
        };

        setCookie("auth_name", userData.name);
        setCookie("auth_email", userData.email);
        setCookie("auth_role", userData.role);

        setLoading(false);
        return {
          success: true,
          message: "User login successful",
          user: userData,
        };
      }

      // Invalid credentials
      setLoading(false);
      setError("Invalid email or password");
      return {
        success: false,
        message: "Invalid email or password",
      };
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        const errorMessage = "Validation failed";
        setError(errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      }
      setError("An error occurred during login");
      return {
        success: false,
        message: "An error occurred during login",
      };
    }
  };

  return {
    login,
    loading,
    error,
    setIsChecked,
    handleSubmit,
    navigate,
    onSubmit,
    control,
    isChecked,
  };
};

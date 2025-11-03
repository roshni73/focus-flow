import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "./forgot-password.schema";
import { useNotification } from "../../../utils/notification";
import { hashEmail } from "../../../utils/helper";

const COUNTDOWN_DURATION = 180;

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const hashedEmail = hashEmail(submittedEmail);
  const { notification } = useNotification();

  const { control, handleSubmit, reset, getValues } =
    useForm<ForgotPasswordFormData>({
      resolver: zodResolver(forgotPasswordSchema),
      mode: "onChange",
      defaultValues: {
        email: "",
      },
    });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const formatCountdown = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }, []);

  const sendPasswordResetLink = async (email: string) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notification.success(
        "Password reset link sent",
        `A password reset link has been sent to ${hashEmail(email)}`
      );

      setCountdown(COUNTDOWN_DURATION);
      setCanResend(false);
      setHasSubmitted(true);
      setSubmittedEmail(email);

      return true;
    } catch (error) {
      notification.error(
        "Error",
        "Failed to send password reset link. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await sendPasswordResetLink(data.email);
  };

  const onResend = async () => {
    const email = getValues("email");
    if (email && canResend) {
      await sendPasswordResetLink(email);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    loading,
    countdown,
    countdownFormatted: formatCountdown(countdown),
    canResend,
    onResend,
    reset,
    hasSubmitted,
    hashedEmail,
  };
};

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../../utils/cookies";
import { hashEmail } from "../../../utils/helper";
import { useNotification } from "../../../utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { otpSchema, type OtpFormData } from "./otp.schema";

const COUNTDOWN_DURATION = 180;

const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const UseOtpAuth = () => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [canResend, setCanResend] = useState(false);
  const email = getCookie("auth_email");
  const hashedEmail = hashEmail(email!);
  const navigate = useNavigate();
  const { notification } = useNotification();

  const { control, handleSubmit } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  // Countdown timer effect
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

  // Format countdown as MM:SS
  const formatCountdown = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }, []);

  const resendOtp = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      notification.success(
        "OTP resent",
        "A new OTP has been sent to your email"
      );
      setCountdown(COUNTDOWN_DURATION);
      setCanResend(false);
    } catch (error) {
      notification.error("Error", "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = (otp: string): boolean => {
    if (otp === "123456") {
      const userId = generateUUID();
      setCookie("auth_id", userId);
      notification.success(
        "Login successfully",
        "You have been authenticated successfully"
      );
      navigate("/app/dashboard");
      return true;
    }
    notification.error("Invalid OTP", "Please enter the correct OTP code");
    return false;
  };

  const onSubmit = async (data: OtpFormData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      verifyOtp(data.otp);
    } catch (error) {
      notification.error("Error", "An error occurred during OTP verification");
    } finally {
      setLoading(false);
    }
  };

  return {
    hashedEmail,
    verifyOtp,
    control,
    handleSubmit: handleSubmit(onSubmit),
    loading,
    countdown,
    countdownFormatted: formatCountdown(countdown),
    canResend,
    onResend: resendOtp,
  };
};

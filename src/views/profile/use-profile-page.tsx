import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie, setCookie } from "../../utils/cookies";
import {
  profileSchema,
  changePasswordSchema,
  type ProfileFormData,
  type ChangePasswordFormData,
} from "./profile.schema";
import { useNotification } from "../../utils/notification";

export const useProfilePage = () => {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { notification } = useNotification();

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Password change form
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { isSubmitting: isPasswordSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Load profile data from cookies
  useEffect(() => {
    const name = getCookie("auth_name") || "";
    const email = getCookie("auth_email") || "";
    const photo = getCookie("auth_photo") || null;

    resetProfile({
      name,
      email,
    });

    if (photo) {
      setProfilePhoto(photo);
    }
  }, [resetProfile]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      setCookie("auth_name", data.name);
      setCookie("auth_email", data.email);

      window.dispatchEvent(
        new CustomEvent("profileUpdated", {
          detail: { name: data.name, email: data.email },
        })
      );

      setIsEditing(false);
      notification.success("Profile updated successfully!");
    } catch (error) {
      notification.error("Failed to update profile");
    }
  };

  const onPasswordChange = async (data: ChangePasswordFormData) => {
    try {
      console.log("Changing password for user:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetPassword();
      setIsChangePasswordModalOpen(false);
      notification.success("Password changed successfully!");
    } catch (error) {
      notification.error("Failed to change password");
    }
  };

  // Handle profile photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      notification.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      notification.error("Image size should be less than 5MB");
      return;
    }

    // Read file and convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setProfilePhoto(base64String);
      setCookie("auth_photo", base64String);
      notification.success("Profile photo updated successfully!");
    };
    reader.onerror = () => {
      notification.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
    resetPassword();
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    const name = getCookie("auth_name") || "";
    const email = getCookie("auth_email") || "";
    resetProfile({
      name,
      email,
    });
    setIsEditing(false);
  };

  return {
    // Profile form
    profileControl,
    handleProfileSubmit: handleProfileSubmit(onProfileSubmit),
    isProfileSubmitting,
    isEditing,
    enableEditing,
    cancelEditing,

    // Password modal
    isChangePasswordModalOpen,
    passwordControl,
    handlePasswordSubmit: handlePasswordSubmit(onPasswordChange),
    isPasswordSubmitting,
    openChangePasswordModal,
    closeChangePasswordModal,

    // Profile photo
    profilePhoto,
    handlePhotoUpload,
  };
};

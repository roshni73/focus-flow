// views/forgot-password.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


import { CheckCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../stores/authStores";
import AppButton from "../../components/button/app-button";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-6">
              <span className="text-2xl font-bold text-indigo-600">Focus Flow</span>
            </div>

            <div className="mb-6">
              <CheckCircleOutlined className="text-5xl text-green-500 mb-4" />
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-gray-600 text-sm">
                We've sent a password reset link to:
              </p>
              <p className="text-indigo-600 font-semibold mt-1">{email}</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  try again
                </button>
              </p>

              <AppButton
                className="w-full py-3 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeftOutlined className="mr-2" />
              Back
            </button>

            <div className="flex justify-center mb-4">
              <span className="text-2xl font-bold text-indigo-600">Focus Flow</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email address and we'll send you a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <AppInput
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError();
                }}
                placeholder="Enter your email address"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <AppButton
              className="w-full py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              htmlType="submit"
              loading={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </AppButton>

            <div className="text-center">
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
// views/login.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Checkbox, Tooltip } from "antd";
import { InfoCircleOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useAuthStore } from "../../stores/authStores";
import AppInput from "../../components/input/app-input";
import AppButton from "../../components/button/app-button";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate("/app/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <span className="text-3xl font-bold text-indigo-600">Focus Flow</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <AppInput
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Tooltip title="Admin: admin@example.com | Viewer: viewer@example.com">
                    <InfoCircleOutlined className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
                  </Tooltip>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <AppInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="flex items-start"
              >
                <span className="text-sm text-gray-600 ml-2">
                  Remember me
                </span>
              </Checkbox>

              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <AppButton
              className="w-full py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              htmlType="submit"
              loading={isLoading}
              disabled={!isChecked || isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </AppButton>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">
              Demo Credentials
            </h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <span className="text-gray-600">Admin:</span>
                <code className="text-indigo-600 font-mono">admin@example.com</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <span className="text-gray-600">Viewer:</span>
                <code className="text-indigo-600 font-mono">viewer@example.com</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <span className="text-gray-600">Password:</span>
                <code className="text-indigo-600 font-mono">password123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
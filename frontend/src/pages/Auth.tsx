import axios from "axios";
import { useState } from "react";
import Button from "../components/ui/Button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { BACKEND_URL } from "../config";

export default function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signin") {
      console.log("Sign in:", {
        username: formData.username,
        password: formData.password,
      });
      await axios.post(`${BACKEND_URL}`);
    } else {
      console.log("Sign up:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-neutral-750 rounded-lg shadow-xl flex flex-col p-4 bg-neutral-850">
        <div className="p-6 space-y-4">
          <div className="flex bg-neutral-750 rounded-lg p-1">
            <button
              onClick={() => {
                setMode("signup");
                setFormData({
                  username: "",
                  password: "",
                  confirmPassword: "",
                });
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              className={`flex-1 py-1 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setMode("signin");
                setFormData({
                  username: "",
                  password: "",
                  confirmPassword: "",
                });
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              className={`flex-1 py-1 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "signin"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Sign In
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-neutral-400 mt-1">
              {mode === "signin"
                ? "enter your credentials to access your recalls"
                : "enter your information to start creating recalls"}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-neutral-200"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-200"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full px-3 py-1.5 pr-10 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (only for signup) */}
            {mode === "signup" && (
              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-neutral-200"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full px-3 py-1.5 pr-10 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-200 focus:outline-none focus:text-neutral-200 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <HiEyeOff size={18} />
                    ) : (
                      <HiEye size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              variants="submit"
              text={mode === "signin" ? "Sign In" : "Sign Up"}
            />
            {/* Toggle Mode Link */}
            <div className="text-center text-sm text-neutral-400">
              {mode === "signin" ? (
                <>
                  {"Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-white hover:text-neutral-200 font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  {"Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-white hover:text-neutral-200 font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

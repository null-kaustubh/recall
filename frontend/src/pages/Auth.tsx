import axios from "axios";
import { useState } from "react";
import Button from "../components/ui/Button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { signinSchema, signupSchema } from "../utils/validation";
import { toast } from "../hooks/use-toast";

export default function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const clearForm = () => {
    setFormData({ username: "", password: "", confirmPassword: "" });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const schema = mode === "signup" ? signupSchema : signinSchema;
      const dataToValidate =
        mode === "signup"
          ? formData
          : { username: formData.username, password: formData.password };

      schema.parse(dataToValidate);

      if (mode === "signin") {
        const response = await axios.post(`${BACKEND_URL}api/signin`, {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        await axios.post(`${BACKEND_URL}api/signup`, {
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        toast("Signed up successfully! Please sign in.", "success");
        setMode("signin");
        clearForm();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (field) {
            fieldErrors[field] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (axios.isAxiosError(error) && error.response) {
        setErrors({
          general: error.response.data.message || "An error occurred.",
        });
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
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
                clearForm();
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
                clearForm();
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
                className={`w-full px-3 py-1.5 bg-neutral-800 border rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all ${
                  errors.username ? "border-red-500" : "border-neutral-700"
                }`}
              />
              {errors.username && (
                <p className="text-red-400 text-xs font-extralight">
                  {errors.username}
                </p>
              )}
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
                  className={`w-full px-3 py-1.5 pr-10 bg-neutral-800 border rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all ${
                    errors.password ? "border-red-500" : "border-neutral-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs font-extralight">
                  {errors.password}
                </p>
              )}
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
                    className={`w-full px-3 py-1.5 pr-10 bg-neutral-800 border rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-neutral-700"
                    }`}
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
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs font-extralight">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* General Error Display - moved here to reduce padding */}
            {errors.general && (
              <p className="text-red-400 text-sm font-extralight -mt-2">
                {errors.general}
              </p>
            )}

            {/* Submit Button */}
            <Button
              variants="submit"
              text={
                loading
                  ? "Loading..."
                  : mode === "signin"
                  ? "Sign In"
                  : "Sign Up"
              }
            />
            {/* Toggle Mode Link */}
            <div className="text-center text-sm text-neutral-400">
              {mode === "signin" ? (
                <>
                  {"Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      clearForm();
                    }}
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
                    onClick={() => {
                      setMode("signin");
                      clearForm();
                    }}
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

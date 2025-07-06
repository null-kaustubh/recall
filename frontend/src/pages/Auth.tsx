import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { API_BASE_URL } from "../config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ZodError } from "zod";
import { signinSchema, signupSchema } from "../utils/validation";
import { toast } from "../hooks/use-toast";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode =
    searchParams.get("mode") === "signin"
      ? "signin"
      : searchParams.get("mode") === "signup"
      ? "signup"
      : "signup";
  const [mode, setMode] = useState<"signin" | "signup">(
    initialMode as "signin" | "signup"
  );
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

  // Update mode if URL changes
  useEffect(() => {
    if (searchParams.get("mode") === "signin" && mode !== "signin") {
      setMode("signin");
    } else if (searchParams.get("mode") === "signup" && mode !== "signup") {
      setMode("signup");
    }
    // eslint-disable-next-line
  }, [searchParams]);

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

      const baseUrl = API_BASE_URL.endsWith("/")
        ? API_BASE_URL.slice(0, -1)
        : API_BASE_URL;

      const endpoint = mode === "signin" ? "/api/signin" : "/api/signup";
      const fullUrl = `${baseUrl}${endpoint}`;

      if (mode === "signin") {
        const response = await axios.post(fullUrl, {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        await axios.post(fullUrl, {
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        toast("Signed up successfully! Please sign in.", "success");
        setMode("signin");
        clearForm();
      }
    } catch (error) {
      console.error("Submit error:", error);

      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (field) {
            fieldErrors[field] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method,
          message: error.message,
        });

        if (error.code === "ECONNABORTED") {
          setErrors({
            general:
              "Request timeout. The server might be starting up. Please try again.",
          });
        } else if (error.response?.status === 404) {
          setErrors({
            general: `API endpoint not found at ${error.config?.url}. Please check the backend configuration.`,
          });
        } else if (error.response?.status && error.response.status >= 500) {
          setErrors({
            general: "Server error. Please try again in a moment.",
          });
        } else if (error.response) {
          setErrors({
            general:
              error.response.data?.message ||
              `Server error: ${error.response.status}`,
          });
        } else if (error.request) {
          setErrors({
            general:
              "Cannot connect to server. Please check your internet connection and try again.",
          });
        } else {
          setErrors({
            general: "Network error occurred. Please try again.",
          });
        }
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-md border border-neutral-300 dark:border-neutral-750 rounded-lg shadow-xl flex flex-col p-4 bg-white dark:bg-neutral-850">
        <div className="p-6 space-y-4">
          <div className="flex bg-neutral-200 dark:bg-neutral-750 rounded-lg p-1">
            <button
              onClick={() => {
                setMode("signup");
                clearForm();
                navigate("/auth?mode=signup");
              }}
              className={`flex-1 py-1 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-200 dark:text-neutral-400 hover:text-neutral-50 dark:hover:text-neutral-200"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setMode("signin");
                clearForm();
                navigate("/auth?mode=signin");
              }}
              className={`flex-1 py-1 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "signin"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-200 dark:text-neutral-400 hover:text-neutral-50 dark:hover:text-neutral-200"
              }`}
            >
              Sign In
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
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
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`w-full px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border rounded-md text-neutral-900 dark:text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all ${
                  errors.username
                    ? "border-red-500"
                    : "border-neutral-300 dark:border-neutral-700"
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
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
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
                  className={`w-full px-3 py-1.5 pr-10 bg-neutral-100 dark:bg-neutral-800 border rounded-md text-neutral-900 dark:text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all ${
                    errors.password
                      ? "border-red-500"
                      : "border-neutral-300 dark:border-neutral-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
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
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
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
                    className={`w-full px-3 py-1.5 pr-10 bg-neutral-100 dark:bg-neutral-800 border rounded-md text-neutral-900 dark:text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-neutral-300 dark:border-neutral-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 focus:outline-none focus:text-neutral-700 dark:focus:text-neutral-200 transition-colors"
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
              type="submit"
              text={
                loading
                  ? "Loading..."
                  : mode === "signin"
                  ? "Sign In"
                  : "Sign Up"
              }
              className="bg-neutral-800 hover:bg-neutral-700"
            />
            {/* Toggle Mode Link */}
            <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              {mode === "signin" ? (
                <>
                  {"Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      clearForm();
                      navigate("/auth?mode=signup");
                    }}
                    className="text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-200 font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
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
                      navigate("/auth?mode=signin");
                    }}
                    className="text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-200 font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
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

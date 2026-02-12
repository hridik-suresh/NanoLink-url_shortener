import { useState } from "react";
import { Mail, Lock, Loader, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../store/slices/authSlice.js";
import axiosInstance from "../api/axiosInstance";
import Input from "../components/Input.jsx";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // 1. Redux Tools
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Tell Redux we are starting the login process (shows spinner)
    dispatch(loginStart());

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      // 3. If successful, save token/user to LocalStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 4. Update Redux with the user data
      dispatch(loginSuccess(response.data.user));

      // 5. Send the user to the dashboard
      navigate("/dashboard");
    } catch (err) {
      // 6. If it fails, tell Redux the error message
      dispatch(
        loginFailure(err.response?.data?.message || "Invalid credentials"),
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4">
      <div className="w-full max-w-md bg-bg-card border border-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Login to manage your links</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl 
                       transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader className="animate-spin size-5" />
            ) : (
              <>
                Sign In <LogIn className="size-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

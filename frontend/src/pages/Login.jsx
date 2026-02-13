import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import api from "../utils/api";
import { setCredentials } from "../store/slices/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleGoogleAuth = () => {
    // This points to your Passport.js route on the backend
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Call the backend login endpoint
      const { data } = await api.post("/auth/login", formData);

      // 2. DISPATCH: Save the user and token into Redux & LocalStorage
      dispatch(setCredentials(data));

      // 3. NAVIGATE: Send the user to the dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main px-4 py-10">
      <div className="w-full max-w-md bg-bg-card rounded-2xl shadow-xl shadow-slate-200/50 border border-border p-6 sm:p-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-main">
            Welcome Back
          </h2>
          <p className="text-text-muted mt-2">
            Log in to manage your NanoLinks
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-danger text-sm flex items-center gap-2 animate-in fade-in duration-300">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-border rounded-xl text-text-main font-semibold hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98] mb-6"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-text-muted">
            <span className="px-4 bg-bg-card">Or email login</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-muted ml-1 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-11"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-text-muted uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                size="sm"
                className="text-xs font-bold text-primary hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-11"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-text-muted text-sm">
          New to NanoLink?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline tracking-tight"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

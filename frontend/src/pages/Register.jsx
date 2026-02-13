import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import api from "../utils/api"; // Custom axios instance

const Register = () => {
  // 1. Local State for form data and UI feedback
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error message when user starts typing again
  };

  // 3. Handle Google Redirect (The Backend does the heavy lifting)
  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`; // Redirect to backend route that starts Google OAuth flow
  };

  // 4. Handle Email/Password Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/auth/register", formData);
      setSuccess(data.message); // "Registration successful! Check email..."
    } catch (err) {
      // Pick up the error message from the backend response
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main px-4 py-10">
      {/* Responsive Card: w-full for mobile, max-w-md for desktop */}
      <div className="w-full max-w-md bg-bg-card rounded-2xl shadow-xl shadow-slate-200/50 border border-border p-6 sm:p-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
          <p className="text-text-muted mt-2">
            Join NanoLink to manage your links
          </p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-danger text-sm flex items-center gap-2 animate-in fade-in duration-300">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-accent text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> {success}
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
          <span>Continue with Google</span>
        </button>

        {/* Separator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-text-muted">
            <span className="px-4 bg-bg-card">Or use email</span>
          </div>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-muted ml-1 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="pl-11"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-muted ml-1 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-11"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-muted ml-1 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
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
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Register Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-text-muted text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-bold hover:underline tracking-tight"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

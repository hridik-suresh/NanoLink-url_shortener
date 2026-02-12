import { useState } from "react";
import { User, Mail, Lock, Loader, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import Input from "../components/Input.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Using our configured axiosInstance
      const response = await axiosInstance.post("/auth/register", formData);
      setMessage(response.data.message);
    } catch (err) {
      // Check if backend sent a specific error message
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4 sm:p-6">
      
      <div className="w-full max-w-md bg-bg-card border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-8 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Join NanoLink to manage your short URLs
          </p>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-8 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-1">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
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

            {/* Error & Success Alerts */}
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger text-sm p-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-accent/10 border border-accent/20 text-accent text-sm p-3 rounded-lg mb-4">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl 
                         transition-all duration-300 transform active:scale-[0.98] 
                         flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader className="animate-spin size-5" />
              ) : (
                <>
                  Get Started <ArrowRight className="size-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-medium underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

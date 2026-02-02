import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering with:", formData);
    // Logic will be added when I implement Redux Toolkit
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 md:pt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-dark tracking-tight mb-2">
          Create an account
        </h2>
        <p className="text-secondary font-medium">
          Join <span className="text-primary font-bold">NanoLink</span> to track
          your links and set custom aliases.
        </p>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-primary/10 border border-slate-100 p-2 md:p-3">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 rounded-[1.4rem] p-8 flex flex-col gap-5"
        >
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-dark shadow-sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-dark shadow-sm"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-dark shadow-sm"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/25 active:scale-[0.98] mt-2 cursor-pointer"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-secondary font-medium mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-bold"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* Trust Badge */}
      <p className="mt-8 text-slate-400 text-xs flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04kM12 21.75c-2.676 0-5.216-.584-7.499-1.632A12.02 12.02 0 013 12c0-2.342.67-4.52 1.83-6.368a12.053 12.053 0 017.67-5.188 12.053 12.053 0 017.67 5.188A12.053 12.053 0 0121 12c0 2.342-.67 4.52-1.83 6.368a12.02 12.02 0 01-7.499 1.632z"
          />
        </svg>
        Secure 256-bit encrypted connection
      </p>
    </div>
  );
};

export default Register;

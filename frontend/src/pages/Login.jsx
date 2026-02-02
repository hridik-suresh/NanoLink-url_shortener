import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Integration with Redux Toolkit comes later
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 md:pt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-dark tracking-tight mb-2">
          Welcome Back
        </h2>
        <p className="text-secondary font-medium">
          Log in to manage your links and view analytics.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-primary/10 border border-slate-100 p-2 md:p-3">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 rounded-[1.4rem] p-8 flex flex-col gap-5"
        >
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
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">
                Password
              </label>
              <button
                type="button"
                className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter"
              >
                Forgot?
              </button>
            </div>
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

          {/* Remember Me Toggle */}
          <div className="flex items-center gap-2 ml-1">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-primary rounded cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-sm text-secondary font-medium cursor-pointer select-none"
            >
              Keep me logged in
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/25 active:scale-[0.98] mt-2 cursor-pointer"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-secondary font-medium mt-2">
            New to NanoLink?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-bold"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>

      <p className="mt-8 text-slate-400 text-xs italic">
        Your data is encrypted and secure.
      </p>
    </div>
  );
};

export default Login;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SocialAuth from "./pages/SocialAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/social-auth" element={<SocialAuth />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback for 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in duration-500">
                  {/* Icon Container */}
                  <div className="bg-danger/10 p-5 rounded-full mb-6">
                    <AlertTriangle className="text-danger w-12 h-12" />
                  </div>

                  {/* Error Text */}
                  <h1 className="text-7xl font-black text-primary tracking-tighter">
                    404
                  </h1>
                  <h2 className="text-2xl font-bold text-text-main mt-2">
                    Page Not Found
                  </h2>
                  <p className="text-text-muted mt-4 max-w-md mx-auto text-lg">
                    The link you followed might be broken, or the page may have
                    been removed. Don't worry, your links are still safe!
                  </p>

                  {/* Action Button */}
                  <Link
                    to="/"
                    className="mt-10 flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
                  >
                    <Home className="w-5 h-5" />
                    Back to Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

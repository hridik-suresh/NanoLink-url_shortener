import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SocialAuth from "./pages/SocialAuth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC GROUP: These will have Navbar & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/social-auth" element={<SocialAuth />} />
        </Route>

        {/* DASHBOARD GROUP: No Navbar/Footer (Self-contained) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404: Also usually stands alone without Navbar */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Extracted 404 for cleanliness
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-bg-main">
    <div className="bg-danger/10 p-5 rounded-full mb-6">
      <AlertTriangle className="text-danger w-12 h-12" />
    </div>
    <h1 className="text-7xl font-black text-primary tracking-tighter">404</h1>
    <h2 className="text-2xl font-bold text-text-main mt-2">Page Not Found</h2>
    <Link
      to="/"
      className="mt-10 flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95"
    >
      <Home className="w-5 h-5" /> Back to Home
    </Link>
  </div>
);

export default App;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { Loader2 } from "lucide-react";

const SocialAuth = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Extract the 'token' and 'user' from the URL
    // Your backend redirects to: /social-auth?token=...&user=...
    const token = searchParams.get("token");
    const userString = searchParams.get("user");

    if (token && userString) {
      try {
        // 2. Parse the user string back into an object
        const user = JSON.parse(userString);

        // 3. Save to Redux and LocalStorage
        dispatch(setCredentials({ token, user }));

        // 4. Success! Move to the dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Social Auth Parse Error:", error);
        navigate("/login?error=social_auth_failed");
      }
    } else {
      // If no token found, something went wrong
      navigate("/login?error=no_token");
    }
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main">
      <div className="bg-bg-card p-8 rounded-2xl shadow-xl border border-border flex flex-col items-center">
        {/* A nice spinning animation while the "catch" happens */}
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-bold text-text-main">Completing Login</h2>
        <p className="text-text-muted mt-2 text-center">
          We're securely signing you in via Google...
        </p>
      </div>
    </div>
  );
};

export default SocialAuth;

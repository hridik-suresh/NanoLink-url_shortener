import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getMe,
} from "../controllers/authController.js";
import passport from "passport";
import { signToken } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const frontendURL = process.env.FRONTEND_URL;

// 1. Regular email/password routes
// POST /api/auth/register
router.post("/register", register);

// 2. Email verification route (user clicks the link in their email)
// GET /api/auth/verify-email/:token
router.get("/verify-email/:token", verifyEmail);

// 3. Login route
// POST /api/auth/login
router.post("/login", login);

// 4. Password reset routes
// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);
// POST /api/auth/reset-password/:token
router.patch("/reset-password/:token", resetPassword);

// 5.START GOOGLE AUTH
// GET /api/auth/google
// This route redirects the user to Google's login page
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// 6.GOOGLE CALLBACK
// GET /api/auth/google/callback
// Google sends the user back here with a "code"
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
  }),
  (req, res) => {
    // If we reach here, Google login was successful!
    // The user data is now inside 'req.user' thanks to Passport

    // Create a JWT for this user just like we do in regular login
    const token = signToken(req.user._id);

    // Redirect the user to the frontend with the token in the query string
    res.redirect(`${frontendURL}/social-auth?token=${token}`);
  },
);

// 7. Protected route to get current user info
// GET /api/auth/me
router.get("/me", protect, getMe);

export default router;

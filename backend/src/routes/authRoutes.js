import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import passport from "passport";
import { signToken } from "../controllers/authController.js";

const router = express.Router();

// 1. Regular email/password routes
router.post("/register", register);
// 2. Email verification route (user clicks the link in their email)
router.get("/verify-email/:token", verifyEmail);
// 3. Login route
router.post("/login", login);
// 4. Password reset routes
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

// 5.START GOOGLE AUTH
// This route redirects the user to Google's login page
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// 6.GOOGLE CALLBACK
// Google sends the user back here with a "code"
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // If we reach here, Google login was successful!
    // The user data is now inside 'req.user' thanks to Passport

    // Create a JWT for this user just like we do in regular login
    const token = signToken(req.user._id);

    // Send the token and user info as JSON response
    res.status(200).json({
      status: "success",
      token,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  },
);

export default router;

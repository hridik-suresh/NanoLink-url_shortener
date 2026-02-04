import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// Helper function to create the Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token lasts for 30 days
  });
};

// @desc    Register new user---------------------------------------------
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password" });
    }

    // 1. Create a random verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 2. Create the user (isVerified defaults to false from our Schema)
    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    // 3. Construct the Verification URL
    const verificationURL = `${req.protocol}://${req.get("host")}/api/auth/verify-email/${verificationToken}`;

    const message = `Welcome to NanoLink, ${name}!\n\nPlease verify your email by clicking the link: ${verificationURL}`;

    // 4. Send the Email
    try {
      await sendEmail({
        email: user.email,
        subject: "Verify your NanoLink Account",
        message,
      });

      res.status(201).json({
        status: "success",
        message:
          "Registration successful! Please check your email to verify your account.",
      });
    } catch (err) {
      console.log(err);

      // Cleanup: If email fails, delete the user so they can try again
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({
        message: "Error sending verification email. Please try again.",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Email-------------------------------------------------
// @route   GET /api/auth/verify-email/:token
export const verifyEmail = async (req, res) => {
  try {
    // 1. Find the user with this token
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token." });
    }

    // 2. Update user status
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token
    user.verificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Email verified successfully! You can now log in.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user-------------------------------------------------
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // 1. Find user & explicitly select the password (since we hid it in the model)
    const user = await User.findOne({ email }).select("+password");

    // Compare the password using the method we added in the User model
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or credentials" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email address before logging in.",
      });
    }

    // 2. Send back token
    res.status(200).json({
      success: true,
      token: signToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc    Forgot password-------------------------------------------------
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res
        .status(400)
        .json({ message: "Please provide your email address." });
    }

    // 1. Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "There is no user with that email address." });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        message:
          "Your email is not verified. Please verify your email first to use this feature.",
      });
    }

    // 2. Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 3. Hash the token and save it to DB (for security)
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token valid for 15 minutes
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // 4. Send it back to user's email
    const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    const message = `Forgot your password? Click here to reset it: ${resetURL}\n\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 15 min)",
        message,
      });

      res
        .status(200)
        .json({ status: "success", message: "Token sent to email!" });
    } catch (err) {
      console.log(err);

      // If email fails, clear the DB fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res
        .status(500)
        .json({ message: "Error sending email. Try again later." });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset password-------------------------------------------------
// @route   POST /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  try {
    // 1. Hash the token from the URL (to match the one in our DB)
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // 2. Find the user with that token AND check if it's still valid (not expired)
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // 3. If no user or token have expired
    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired." });
    }

    // 4. Update the password and clear the reset fields
    user.password = req.body.password; // Note: User model should have a .pre('save') to hash this!
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Password updated successfully!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

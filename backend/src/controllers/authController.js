import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create user (The pre-save hook in our model hashes the password)
    const user = await User.create({ name, email, password });

    // 3. Send back user data and the Token
    res.status(201).json({
      success: true,
      token: signToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user & explicitly select the password (since we hid it in the model)
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or credentials" });
    }

    // 2. Send back token
    res.status(200).json({
      success: true,
      token: signToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in the Headers (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (split "Bearer <token>" and take the second part)
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find user by ID (decoded from token) and attach to the request object
      // We exclude the password for safety
      req.user = await User.findById(decoded.id).select("-password");

      // Move to the next function (the Controller)
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 4. If no token at all
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

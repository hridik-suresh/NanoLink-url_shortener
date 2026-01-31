import jwt from "jsonwebtoken";
import User from "../models/User.js";

// USE THIS: For private pages (Dashboard, Delete Link, etc.)
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next(); // SUCCESS: Exit the middleware and go to controller
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token was found
  res.status(401).json({ message: "Not authorized, no token" });
};

// USE THIS: For the "Shorten URL" route (Guest + User support)
export const optionalProtect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      // Token was bad/expired, so we just treat them as a guest
      req.user = null;
    }
  } else {
    req.user = null; // No token, definitely a guest
  }
  next();
};

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// USE THIS: For private pages (Dashboard, Delete Link, etc.)
export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if the token exists in the "Authorization" header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if the user still exists in the database
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
    }

    // 4. GRANT ACCESS
    // Attach the user to the request object so routes can use it (req.user)
    req.user = currentUser;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid token or session expired.",
    });
  }
};

// USE THIS: For the "Shorten URL" route (Guest)
export const optionalProtect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    }
    next(); // Always move to the next step, even if no user is found
  } catch (error) {
    next(); // Even if token is invalid, let them proceed as a guest
  }
};

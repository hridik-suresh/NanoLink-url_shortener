import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
// import cron from "node-cron";
// import { exec } from "child_process";
// import path from "path";
// import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";
import urlRoutes from "./src/routes/urlRoutes.js";
import { redirectUrl } from "./src/controllers/urlController.js";
import authRoutes from "./src/routes/authRoutes.js";
import "./src/config/passport.js"; // runs it to configure passport strategies
import analyticsRoutes from "./src/routes/analyticsRoutes.js";

const app = express();

const PORT = process.env.PORT || 8080;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// IP Database Auto-Update Cron Job ---
// cron.schedule("* * * * *", () => {
//   console.log("Running scheduled IP database update...");
//   const licenseKey = process.env.MAXMIND_LICENSE_KEY;

//   // Add these at the very top of server.js to handle paths in ES Modules
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   // ... inside your cron.schedule ...
//   const scriptPath = path.join(
//     __dirname,
//     "node_modules",
//     "geoip-lite",
//     "scripts",
//     "updatedb.js",
//   );

//   exec(
//     `node "${scriptPath}"`,
//     {
//       env: {
//         ...process.env,
//         GEOLITE2_LICENSE_KEY: licenseKey,
//       },
//     },
//     (error, stdout, stderr) => {
//       if (error) {
//         console.error(` Cron Error: ${error.message}`);
//         console.error(` stderr: ${stderr}`);
//         return;
//       }
//       console.log(` Success: ${stdout}`);
//     },
//   );
// });

// Routes-----------------

//  Auth Routes
app.use("/api/auth", authRoutes);
//  URL Management Routes
app.use("/api/url", urlRoutes);
//  Analytics Routes
app.use("/api/analytics", analyticsRoutes);
//  The Redirect Route
app.get("/:shortId", redirectUrl);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}: http://localhost:${PORT}`),
);

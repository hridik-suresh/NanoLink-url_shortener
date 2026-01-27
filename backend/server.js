import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { nanoid } from "nanoid";
import connectDB from "./src/config/db.js";

const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/create", (req, res) => {
  console.log(req.body.url);
  res.send(nanoid(7));
});

app.listen(PORT, () => {
  console.log(`Server is listening: http://localhost:${PORT}`);
});

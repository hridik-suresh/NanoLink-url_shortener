import express from "express";
const app = express();
import { nanoid } from "nanoid";

const PORT = 3000;

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

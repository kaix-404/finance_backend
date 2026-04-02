import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

app.use("/auth", authRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(5000, () => console.log("Server running"));
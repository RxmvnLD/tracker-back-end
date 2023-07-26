import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

//Body parser
app.use(express.json());

//
app.use(morgan("dev"));

//Routes
app.use("/api", authRoutes);

export default app;

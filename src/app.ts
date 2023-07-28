import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import bankAccountRoutes from "./routes/bankAccounts.routes";

dotenv.config();

const app = express();

//Body parser
app.use(express.json());

//beautify terminal
app.use(morgan("dev"));

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", bankAccountRoutes);

export default app;

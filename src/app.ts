import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import bankAccountRoutes from "./routes/bankAccounts.routes";
import transactionRoutes from "./routes/transactions.routes";
import { authRequired } from "./middlewares/validateToken";
//import session from "express-session";
dotenv.config();

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//beautify terminal
app.use(morgan("dev"));

//app.set("trust proxy", 1); // trust first proxy

//CORS
const whitelist = [
    process.env.CLIENT_URL as string,
    process.env.CLIENT_URL_LOCALHOST as string,
];
app.use(
    cors({
        origin: whitelist,
        credentials: true,
        exposedHeaders: ["Set-Cookie"],
    }),
);
//Routes
app.use("/api", authRoutes);
app.use("/api", authRequired, userRoutes);
app.use("/api", authRequired, bankAccountRoutes);
app.use("/api", authRequired, transactionRoutes);

export default app;

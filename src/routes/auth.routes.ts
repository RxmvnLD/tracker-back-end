import { Router } from "express";
import { login, logout, signup, verify } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/verify", verify);

export default router;

import { Router } from "express";
import {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users/all", getUsers);
router.get("/users", getUser);
router.put("/users", updateUser);
router.delete("/users", deleteUser);

export default router;

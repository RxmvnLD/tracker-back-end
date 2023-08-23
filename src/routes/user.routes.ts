import { Router } from "express";
import {
    getUser,
    getUserSummary,
    getUsers,
    deleteUser,
    updateUser,
} from "../controllers/user.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { updateUserSchema } from "../utils/validations/userValidations";

const router = Router();

router.get("/users/all", getUsers);
router.get("/users", getUser);
router.get("/users/summary", getUserSummary);
router.put("/users", schemaValidator(updateUserSchema), updateUser);
router.delete("/users", deleteUser);

export default router;

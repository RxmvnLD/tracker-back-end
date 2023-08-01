import { Router } from "express";
import {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
} from "../controllers/user.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { updateUserSchema } from "../utils/validations/userValidations";

const router = Router();

router.get("/users/all", getUsers);
router.get("/users", getUser);
router.put("/users", schemaValidator(updateUserSchema), updateUser);
router.delete("/users", deleteUser);

export default router;

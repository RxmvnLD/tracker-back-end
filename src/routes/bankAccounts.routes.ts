import { Router } from "express";
import {
    createBankAccount,
    getBankAccount,
    getBankAccounts,
    getUserBankAccounts,
    updateBankAccount,
    deleteBankAccount,
} from "../controllers/bankAccounts.controller";

const router = Router();

router.post("/bankAccounts", createBankAccount);
router.get("/bankAccounts/all", getBankAccounts);
router.get("/bankAccounts/user", getUserBankAccounts);
router.get("/bankAccounts/:id", getBankAccount);
router.put("/bankAccounts/:id", updateBankAccount);
router.delete("/bankAccounts/:id", deleteBankAccount);

export default router;

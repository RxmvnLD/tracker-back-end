import { Router } from "express";
import {
    createTransaction,
    deleteTransaction,
    getTransaction,
    getTransactions,
    updateTransaction,
} from "../controllers/transactions.controller";

const router = Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransaction);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

export default router;

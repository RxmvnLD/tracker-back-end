import { Router } from "express";
import {
    createTransaction,
    deleteTransaction,
    getTransaction,
    getTransactions,
    updateTransaction,
} from "../controllers/transactions.controller";
import {
    transactionSchema,
    updateTransactionSchema,
} from "../utils/validations/transactionValidations";
import { schemaValidator } from "../middlewares/schemaValidator";

const router = Router();

router.post(
    "/transactions",
    schemaValidator(transactionSchema),
    createTransaction,
);
router.get("/transactions/all", getTransactions);
router.get("/transactions/:id", getTransaction);
router.put(
    "/transactions/:id",
    schemaValidator(updateTransactionSchema),
    updateTransaction,
);
router.delete("/transactions/:id", deleteTransaction);

export default router;

import { Request, Response } from "express";
import {
    transactionSchema,
    updateTransactionSchema,
} from "../utils/validations/transactionValidations";
import transactionService from "../services/transaction.services";

export const createTransaction = async (req: Request, res: Response) => {
    try {
        await transactionSchema.validateAsync(req.body);
    } catch (error: any) {
        console.log(error);
        const errorMsj = `${error.details[0].message} is required`;
        return res.status(400).json({ message: errorMsj });
    }
    try {
        const transaction = await transactionService.createTransaction(
            req.body,
        );
        if (!transaction)
            return res
                .status(404)
                .json({ message: "ERROR CREATING TRANSACTION" });
        return res.status(201).json(transaction);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const getTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const transaction = await transactionService.getTransaction(id);
        if (!transaction)
            return res.status(404).json({ message: "Transaction not found" });
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    try {
        await updateTransactionSchema.validateAsync(req.body);
    } catch (error: any) {
        console.log(error);
        const errorMsj = error.details[0].message;
        return res.status(400).json({ message: errorMsj });
    }
    try {
        const { id } = req.params;
        const transaction = await transactionService.updateTransaction(
            id,
            req.body,
        );
        if (!transaction)
            return res.status(404).json({ message: "Transaction not found" });
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(400).json(error);
    }
};
export const getTransactions = async (_req: Request, res: Response) => {
    try {
        const transactions = await transactionService.getTransactions();
        if (!transactions)
            return res.status(404).json({ message: "Transactions not found" });
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(400).json(error);
    }
};
export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const transaction = await transactionService.deleteTransaction(id);
        if (!transaction)
            return res.status(404).json({ message: "Transaction not found" });
        return res.status(200).json({ message: "Transaction deleted" });
    } catch (error) {
        return res.status(400).json(error);
    }
};

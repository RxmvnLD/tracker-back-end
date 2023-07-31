import { Request, Response } from "express";
import bankAccountService from "../services/bankAccounts.services";

import {
    creditAccountSchema,
    debitAccountSchema,
    creditDebitAccountSchema,
    updateCreditAccountSchema,
    updateDebitAccountSchema,
    updateCreditDebitAccountSchema,
} from "../utils/validations/bankAccountValidations";

export const createBankAccount = async (req: Request, res: Response) => {
    const type = req.body.type;
    try {
        if (type === "credit")
            await creditAccountSchema.validateAsync(req.body);
        if (type === "debit") await debitAccountSchema.validateAsync(req.body);
        if (type === "both")
            await creditDebitAccountSchema.validateAsync(req.body);
    } catch (error: any) {
        const errorMsj = error.details[0].message;
        return res.status(400).json({ message: errorMsj });
    }

    try {
        const bankAcc = await bankAccountService.createBankAccount(req.body);
        if (!bankAcc) {
            return res
                .status(404)
                .json({ message: "ERROR CREATING BANK ACCOUNT" });
        }
        return res.status(201).json(bankAcc);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        return res.status(400).json(error);
    }
};

export const getBankAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bankAcc = await bankAccountService.getBankAccount(id);
        if (!bankAcc) {
            return res.status(404).json({ message: "Bank account not found" });
        }
        return res.status(200).json(bankAcc);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const getBankAccounts = async (_req: Request, res: Response) => {
    try {
        const bankAccs = await bankAccountService.getBankAccounts();
        return res.status(200).json(bankAccs);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const updateBankAccount = async (req: Request, res: Response) => {
    const type = req.body.type;
    try {
        if (type === "credit")
            await updateCreditAccountSchema.validateAsync(req.body);
        if (type === "debit")
            await updateDebitAccountSchema.validateAsync(req.body);
        if (type === "both")
            await updateCreditDebitAccountSchema.validateAsync(req.body);
    } catch (error: any) {
        console.log(error);
        const errorMsj = error.details[0].message;
        return res.status(400).json({ message: errorMsj });
    }
    try {
        const { id } = req.params,
            newData = req.body,
            updateBankAccount = await bankAccountService.updateBankAccount(
                id,
                newData,
            );
        if (!updateBankAccount) {
            return res.status(404).json({ message: "Bank account not found" });
        }
        return res.status(200).json(updateBankAccount);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        return res.status(400).json(error);
    }
};

export const deleteBankAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bankAcc = await bankAccountService.deleteBankAccount(id);
        if (!bankAcc) {
            return res.status(404).json({ message: "Bank account not found" });
        }
        return res.status(200).json({ message: "Bank account deleted" });
    } catch (error) {
        return res.status(400).json(error);
    }
};

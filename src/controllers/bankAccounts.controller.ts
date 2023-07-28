import { Request, Response } from "express";
import bankAccountService from "../services/bankAccounts.services";

import {
    creditCardSchema,
    creditDebitCardSchema,
    debitCardSchema,
} from "../utils/validations/bankAccountValidations";

export const createBankAccount = async (req: Request, res: Response) => {
    const type = req.body.type;
    try {
        if (type === "credit") await creditCardSchema.validateAsync(req.body);
        if (type === "debit") await debitCardSchema.validateAsync(req.body);
        if (type === "both")
            await creditDebitCardSchema.validateAsync(req.body);
    } catch (error: any) {
        console.log(error);
        const errorMsj = error.details[0].message;
        return res.status(400).json({ message: errorMsj });
    }

    try {
        const bankAcc = await bankAccountService.createBankAccount(req.body);
        return res.status(201).json(bankAcc);
    } catch (error) {
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
        if (type === "credit") await creditCardSchema.validateAsync(req.body);
        if (type === "debit") await debitCardSchema.validateAsync(req.body);
        if (type === "both")
            await creditDebitCardSchema.validateAsync(req.body);
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
        return res.status(200).json(updateBankAccount);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const deleteBankAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await bankAccountService.deleteBankAccount(id);
        return res.status(200).json({ message: "Bank account deleted" });
    } catch (error) {
        return res.status(400).json(error);
    }
};

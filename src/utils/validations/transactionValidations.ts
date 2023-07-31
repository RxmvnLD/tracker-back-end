import Joi from "joi";

export const transactionSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("income", "expense").required(),
    amount: Joi.number().min(0).required(),
    accountToCharge: Joi.string().valid("credit", "debit").required(),
    bankAccount: Joi.string().required(),
});

export const updateTransactionSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    type: Joi.string().valid("income", "expense"),
    amount: Joi.number().min(0),
    accountToCharge: Joi.string().valid("credit", "debit"),
    bankAccount: Joi.string().required(),
});

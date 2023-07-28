import Joi from "joi";

export const transactionSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid("income", "expense").required(),
    amount: Joi.number().required(),
    bankAccount: Joi.string().required(),
});

export const updateTransactionSchema = Joi.object({
    name: Joi.string(),
    type: Joi.string().valid("income", "expense"),
    amount: Joi.number(),
    bankAccount: Joi.string().required(),
});

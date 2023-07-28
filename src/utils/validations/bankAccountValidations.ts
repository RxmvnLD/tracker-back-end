import Joi from "joi";

const date = new Date(),
    year = date.getFullYear();
console.log(date);

export const creditCardSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
    credit: Joi.number().greater(0).required(),
    cuttOffDay: Joi.date().required().greater(`1 / 1 / ${year}`),
    paydayLimit: Joi.date().required().greater(`1 / 1 / ${year}`),
    color: Joi.string()
        .valid(
            "red",
            "pink",
            "green",
            "yellow",
            "orange",
            "purple",
            "blue",
            "cyan",
            "brown",
            "black",
            "white",
            "gray",
        )
        .required(),
    user: Joi.string().required(),
});

export const debitCardSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
    balance: Joi.number().required(),
    color: Joi.string()
        .valid(
            "red",
            "pink",
            "green",
            "yellow",
            "orange",
            "purple",
            "blue",
            "cyan",
            "brown",
            "black",
            "white",
            "gray",
        )
        .required(),
    user: Joi.string().required(),
});

export const creditDebitCardSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
    balance: Joi.number().required(),
    credit: Joi.number().greater(0).required(),
    cuttOffDay: Joi.date().required(),
    paydayLimit: Joi.date().required(),
    color: Joi.string()
        .valid(
            "red",
            "pink",
            "green",
            "yellow",
            "orange",
            "purple",
            "blue",
            "cyan",
            "brown",
            "black",
            "white",
            "gray",
        )
        .required(),
    user: Joi.string().required(),
});

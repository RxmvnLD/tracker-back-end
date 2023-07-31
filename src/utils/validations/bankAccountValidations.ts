import Joi from "joi";

const date = new Date(),
    year = date.getFullYear();
console.log(date);

export const creditAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
    totalCredit: Joi.number().greater(0).required(),
    availableCredit: Joi.number()
        .greater(0)
        .less(Joi.ref("totalCredit"))
        .required(),
    cuttOffDay: Joi.date().greater(`1 / 1 / ${year}`).required(),
    paydayLimit: Joi.date().greater(`1 / 1 / ${year}`).required(),
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

export const updateCreditAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    type: Joi.string().valid("credit", "debit", "both"),
    totalCredit: Joi.number().greater(0).required(),
    availableCredit: Joi.number()
        .greater(0)
        .less(Joi.ref("totalCredit"))
        .required(),
    cuttOffDay: Joi.date().greater(`1 / 1 / ${year}`),
    paydayLimit: Joi.date().greater(`1 / 1 / ${year}`),
    color: Joi.string().valid(
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
    ),
    user: Joi.string().required(),
});

export const debitAccountSchema = Joi.object({
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

export const updateDebitAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    type: Joi.string().valid("credit", "debit", "both"),
    balance: Joi.number(),
    color: Joi.string().valid(
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
    ),
    user: Joi.string().required(),
});

export const creditDebitAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
    balance: Joi.number().required(),
    totalCredit: Joi.number().greater(0).required(),
    availableCredit: Joi.number()
        .greater(0)
        .less(Joi.ref("totalCredit"))
        .required(),
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

export const updateCreditDebitAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    type: Joi.string().valid("credit", "debit", "both"),
    balance: Joi.number(),
    totalCredit: Joi.number().greater(0),
    availableCredit: Joi.number().greater(0).less(Joi.ref("totalCredit")),
    cuttOffDay: Joi.date(),
    paydayLimit: Joi.date(),
    color: Joi.string().valid(
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
    ),
    user: Joi.string().required(),
});

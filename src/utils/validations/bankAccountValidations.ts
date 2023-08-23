import Joi from "joi";

const date = new Date(),
    year = date.getFullYear();

export const creditAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "dual").required(),
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
});

export const updateCreditAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    type: Joi.string().valid("credit", "debit", "dual"),
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
});

export const debitAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "dual").required(),
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
});

export const updateDebitAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    type: Joi.string().valid("credit", "debit", "dual"),
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
});

export const creditDebitAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid("credit", "debit", "dual").required(),
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
});

export const updateCreditDebitAccountSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    type: Joi.string().valid("credit", "debit", "dual"),
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
});

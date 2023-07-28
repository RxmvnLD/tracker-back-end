import { Schema, model } from "mongoose";
import { IBankAccount, IBankAccountModel } from "../../interfaces/IBankAccount";

const bankAccountSchema: Schema<IBankAccount> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["credit", "debit", "both"],
        },
        balance: {
            type: Number,
        },
        credit: {
            type: Number,
        },
        cuttOffDay: {
            type: Date,
        },
        paydayLimit: {
            type: Date,
        },
        color: {
            type: String,
            required: true,
            enum: [
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
            ],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        transactions: {
            incomes: {
                type: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Transaction",
                    },
                ],
            },
            expenses: {
                type: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Transaction",
                    },
                ],
            },
        },
    },
    { timestamps: true },
);

bankAccountSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export default model<IBankAccount, IBankAccountModel>(
    "BankAccount",
    bankAccountSchema,
);

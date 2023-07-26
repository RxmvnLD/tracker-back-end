import { Schema, model, models } from "mongoose";
import { BankAccType } from "../../types";

export interface IBankAccount {
    name: string;
    type: BankAccType;
    balance: number;
    cuttOffDate: Date;
    paydayLimit: Date;
    color: string;
    transactions: Schema.Types.ObjectId[];
}

const bankAccountSchema = new Schema(
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
            required: true,
        },
        cuttOffDate: {
            type: Date,
            required: true,
        },
        paydayLimit: {
            type: Date,
            required: true,
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
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Transaction",
                },
            ],
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

export default models.BankAccount ||
    model<IBankAccount>("BankAccount", bankAccountSchema);

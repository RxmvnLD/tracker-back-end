import { Schema, model } from "mongoose";
import { ITransaction, ITransactionModel } from "../../interfaces/ITransaction";

const transactionSchema: Schema<ITransaction> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        accountToCharge: {
            type: String,
            enum: ["credit", "debit"],
            required: true,
        },
        bankAccount: {
            type: Schema.Types.ObjectId,
            ref: "BankAccount",
        },
    },
    { timestamps: true },
);

transactionSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export default model<ITransaction, ITransactionModel>(
    "Transaction",
    transactionSchema,
);

import { Schema, model, models } from "mongoose";
import { TransactionType } from "../../types";

export interface ITransaction {
    name: string;
    type: TransactionType;
    amount: number;
}

const transactionSchema = new Schema(
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

export default models.Transaction ||
    model<ITransaction>("Transaction", transactionSchema);

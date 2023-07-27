import { Schema, Document, Model } from "mongoose";
import { TransactionType } from "../types";

export interface ITransaction extends Document {
    name: string;
    type: TransactionType;
    amount: number;
    bankAccount: Schema.Types.ObjectId;
}

export interface ITransactionModel extends Model<ITransaction> {}

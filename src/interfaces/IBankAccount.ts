import { Schema, Document, Model } from "mongoose";
import { BankAccType } from "../types";

export interface IBankAccount extends Document {
    name: string;
    type: BankAccType;
    balance: number;
    cuttOffDate: Date;
    paydayLimit: Date;
    color: string;
    user: Schema.Types.ObjectId;
    transactions: Schema.Types.ObjectId[];
}
export interface IBankAccountModel extends Model<IBankAccount> {}

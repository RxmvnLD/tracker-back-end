import { Schema, Document, Model } from "mongoose";
import { BankAccColor, BankAccType } from "../types";

export interface IBankAccount extends Document {
    name: string;
    type: BankAccType;
    //Only for debit card
    balance?: number;
    //Only for credit card
    totalCredit?: number;
    availableCredit?: number;
    cuttOffDay?: Date;
    paydayLimit?: Date;
    //
    color: BankAccColor;
    user: Schema.Types.ObjectId;
    transactions: {
        incomes: Schema.Types.ObjectId[];
        expenses: Schema.Types.ObjectId[];
    };
}
export interface IBankAccountModel extends Model<IBankAccount> {}

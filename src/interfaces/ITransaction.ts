import { Schema, Document, Model } from "mongoose";
import { TransactionType, TransactionAccount } from "../types";

export interface ITransaction extends Document {
    name: string;
    type: TransactionType;
    amount: number;
    //If the bank acc it's credit and debit, the user can choose which account to charge
    accountToCharge?: TransactionAccount;
    bankAccount: Schema.Types.ObjectId;
}

export interface ITransactionModel extends Model<ITransaction> {}

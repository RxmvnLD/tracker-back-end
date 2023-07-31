import { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    bankAccounts: Schema.Types.ObjectId[];
    betsStatus: {
        totalBets: {
            type: Number;
        };
        totalWins: {
            type: Number;
        };
        totalLosses: {
            type: Number;
        };
        profit: {
            type: Number;
        };
        loss: {
            type: Number;
        };
        bets: Schema.Types.ObjectId[];
    };
    createdAt: {
        type: Date;
    };
}

export interface IUserModel extends Model<IUser> {}

import { Schema, model, models } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    bankAccounts: Schema.Types.ObjectId[];
    betsStatus: {
        bets: Schema.Types.ObjectId[];
    };
}

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bankAccounts: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "BankAccount",
                },
            ],
        },
        betsStatus: {
            totalBets: {
                type: Number,
            },
            totalWins: {
                type: Number,
            },
            totalLosses: {
                type: Number,
            },
            bets: {
                type: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Bet",
                    },
                ],
            },
            profit: {
                type: Number,
            },
            loss: {
                type: Number,
            },
        },
    },
    { timestamps: true },
);

userSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    },
});

export default models.User || model<IUser>("User", userSchema);

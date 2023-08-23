import User from "../models/User.model";
import { hash } from "bcryptjs";
import BankAccountModel from "../models/expensesTracker/BankAccount.model";
import TransactionModel from "../models/expensesTracker/Transaction.model";
const getUser = async (id: String) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    if ((user?.bankAccounts.length as number) > 0) {
        await user?.populate({ path: "bankAccounts", model: BankAccountModel });
    }
    return user;
};
const getUserSummary = async (id: String) => {
    const bankAccounts = await BankAccountModel.find({ user: id });

    let incomes = 0,
        expenses = 0,
        balance = 0,
        debitAccounts = 0,
        creditAccounts = 0,
        dualAccounts = 0;

    for (const account of bankAccounts) {
        balance += account.balance || 0;
        if (account.type === "debit") {
            console.log(account);

            debitAccounts++;
        }
        if (account.type === "credit") creditAccounts++;
        if (account.type === "dual") dualAccounts++;

        //Sum all incomes
        const incomeTransactions = await TransactionModel.find({
            bankAccount: account._id,
            type: "income",
        });
        for (const transaction of incomeTransactions) {
            incomes += transaction.amount;
        }
        //Sum all incomes
        const expenseTransactions = await TransactionModel.find({
            bankAccount: account._id,
            type: "expense",
        });
        for (const transaction of expenseTransactions) {
            expenses += transaction.amount;
        }
    }
    const userSummary = {
        incomes,
        expenses,
        balance,
        debitAccounts,
        creditAccounts,
        dualAccounts,
    };
    return userSummary;
};

const getUsers = async () => {
    const users = await User.find();
    return users;
};

interface newUserDataInterface {
    username?: string;
    email?: string;
    password?: string;
}

const updateUser = async (id: string, newData: newUserDataInterface) => {
    if (newData.password) {
        const newHashedPass = await hash(newData.password, 12);
        newData.password = newHashedPass;
        let user = await User.findByIdAndUpdate(id, newData, {
            new: true,
        });
        return user;
    }
    let user = await User.findByIdAndUpdate(id, newData, {
        new: true,
    });
    if (!user) throw new Error("User not found");
    return user;
};

const deleteUser = async (id: String) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");
    return user;
};

const userService = {
    getUser,
    getUserSummary,
    getUsers,
    updateUser,
    deleteUser,
};
export default userService;

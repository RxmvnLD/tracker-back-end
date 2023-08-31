import Transaction from "../models/expensesTracker/Transaction.model";
import { ITransaction } from "../interfaces/ITransaction";
import { TransactionType } from "../types";
import BankAccount from "../models/expensesTracker/BankAccount.model";
import TransactionModel from "../models/expensesTracker/Transaction.model";
import UserModel from "../models/User.model";

const createTransaction = async (id: string, data: ITransaction) => {
    //Get the user to update
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User not found");
    //Get the bank account to update
    const bankAcc = await BankAccount.findById(data.bankAccount);
    if (!bankAcc) throw new Error("Bank account not found");
    //Validations
    newTransactionValidations(bankAcc, data);
    //Create the transaction and save it on the DB
    const transaction = new Transaction({ ...data, user: bankAcc.user });
    user?.transactions.push(transaction.id);
    await user?.save();
    const savedTransaction = await transaction.save();
    //Update the bank account transactions
    if (savedTransaction.type === "income") {
        bankAcc?.transactions.incomes.push(savedTransaction.id);
        if (savedTransaction.accountToCharge === "debit")
            if (bankAcc?.balance) bankAcc.balance += savedTransaction.amount;

        if (savedTransaction.accountToCharge === "credit")
            if (bankAcc?.availableCredit)
                bankAcc.availableCredit += savedTransaction.amount;
    }

    if (savedTransaction.type === "expense") {
        bankAcc?.transactions.expenses.push(savedTransaction.id);
        if (savedTransaction.accountToCharge === "debit")
            if (bankAcc?.balance) bankAcc.balance -= savedTransaction.amount;

        if (savedTransaction.accountToCharge === "credit")
            if (bankAcc?.availableCredit)
                bankAcc.availableCredit -= savedTransaction.amount;
    }
    await bankAcc?.save();
    return savedTransaction;
};

const getTransactions = async () => {
    const transactions = await Transaction.find();
    return transactions;
};
const getUserTransactions = async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User not found");
    if ((user?.transactions.length as number) > 0) {
        await user?.populate({ path: "transactions", model: TransactionModel });
    }
    return user.transactions;
};

const getTransaction = async (id: String) => {
    const transaction = await Transaction.findById(id);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
};

interface updatedTransactionInterface {
    name?: string;
    type?: TransactionType;
    amount?: number;
}
const updateTransaction = async (
    id: string,
    newData: updatedTransactionInterface,
) => {
    const transaction = await Transaction.findByIdAndUpdate(id, newData, {
        new: true,
    });
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
};

const deleteTransaction = async (id: String) => {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
};

function newTransactionValidations(bankAcc: any, data: ITransaction) {
    if (bankAcc.type === "debit" && data.accountToCharge === "credit") {
        throw new Error(
            "You can't charge a credit account with a debit account",
        );
    }
    if (bankAcc.type === "credit" && data.accountToCharge === "debit") {
        throw new Error(
            "You can't charge a debit account with a credit account",
        );
    }
    if (
        data.type === "expense" &&
        data.accountToCharge === "debit" &&
        data.amount > bankAcc.balance
    ) {
        throw new Error("You don't have enough money to do this transaction");
    }
    if (
        data.type === "expense" &&
        data.accountToCharge === "credit" &&
        data.amount > bankAcc.availableCredit
    ) {
        throw new Error("You don't have enough credit to do this transaction");
    }

    if (bankAcc.type === "dual") {
        if (
            data.type === "expense" &&
            data.accountToCharge === "debit" &&
            data.amount > bankAcc.balance
        ) {
            throw new Error(
                "You don't have enough money to do this transaction",
            );
        }
        if (
            data.type === "expense" &&
            data.accountToCharge === "credit" &&
            data.amount > bankAcc.availableCredit
        ) {
            throw new Error(
                "You don't have enough credit to do this transaction",
            );
        }
    }
}

const transactionService = {
    createTransaction,
    getTransactions,
    getUserTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};
export default transactionService;

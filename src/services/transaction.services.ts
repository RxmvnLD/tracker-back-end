import Transaction from "../models/expensesTracker/Transaction.model";
import { ITransaction } from "../interfaces/ITransaction";
import { TransactionType } from "../types";
import BankAccount from "../models/expensesTracker/BankAccount.model";

const createTransaction = async (data: ITransaction) => {
    const bankAcc = await BankAccount.findById(data.bankAccount);
    const transaction = new Transaction(data);
    const savedTransaction = await transaction.save();
    if (savedTransaction.type === "income")
        bankAcc?.transactions.incomes.push(savedTransaction.id);
    if (savedTransaction.type === "expense")
        bankAcc?.transactions.expenses.push(savedTransaction.id);
    await bankAcc?.save();
    return savedTransaction;
};

const getTransactions = async () => {
    const transactions = await Transaction.find();
    return transactions;
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

const transactionService = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};

export default transactionService;

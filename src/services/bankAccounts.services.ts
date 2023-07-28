import BankAccount from "../models/expensesTracker/BankAccount.model";
import { IBankAccount } from "../interfaces/IBankAccount";
import { BankAccType } from "../types";
import User from "../models/User.model";

const createBankAccount = async (data: IBankAccount) => {
    const user = await User.findById(data.user);
    const bankAcc = new BankAccount(data);
    const savedAcc = await bankAcc.save();
    user?.bankAccounts.push(savedAcc.id);
    await user?.save();
    return savedAcc;
};
const getBankAccounts = async () => {
    const bankAcc = await BankAccount.find();
    return bankAcc;
};
const getBankAccount = async (id: String) => {
    const bankAcc = await BankAccount.findById(id);
    return bankAcc;
};

interface updatedBankAccInterface {
    name?: string;
    type?: BankAccType;
    balance?: number;
    totalCredit?: number;
    availableCredit?: number;
    cuttOffDay?: Date;
    paydayLimit?: Date;
    color?: string;
}
const updateBankAccount = async (
    id: string,
    newData: updatedBankAccInterface,
) => {
    const bankAcc = await BankAccount.findByIdAndUpdate(id, newData, {
        new: true,
    });
    return bankAcc;
};

const deleteBankAccount = async (id: String) => {
    const bankAcc = await BankAccount.findByIdAndDelete(id);
    return bankAcc;
};

const bankAccountService = {
    createBankAccount,
    getBankAccounts,
    getBankAccount,
    updateBankAccount,
    deleteBankAccount,
};

export default bankAccountService;

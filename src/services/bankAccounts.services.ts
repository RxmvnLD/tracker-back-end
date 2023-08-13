import BankAccount from "../models/expensesTracker/BankAccount.model";
import { IBankAccount } from "../interfaces/IBankAccount";
import { BankAccType } from "../types";
import User from "../models/User.model";
import BankAccountModel from "../models/expensesTracker/BankAccount.model";

const createBankAccount = async (id: string, data: IBankAccount) => {
    const user = await User.findById(id);
    const bankAcc = new BankAccount(data);
    const savedAcc = await bankAcc.save();
    checkDaysBetweenDates(
        savedAcc.cuttOffDay as Date,
        savedAcc.paydayLimit as Date,
    );
    user?.bankAccounts.push(savedAcc.id);
    await user?.save();
    return savedAcc;
};
const getBankAccounts = async () => {
    const bankAcc = await BankAccount.find();
    return bankAcc;
};
const getUserBankAccounts = async (id: string) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    if ((user?.bankAccounts.length as number) > 0) {
        await user?.populate({ path: "bankAccounts", model: BankAccountModel });
    }
    return user.bankAccounts;
};
const getBankAccount = async (id: String) => {
    const bankAcc = await BankAccount.findById(id);
    if (!bankAcc) throw new Error("Bank account not found");
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
    const bankAcc = await BankAccount.findById(id);
    if (!bankAcc) throw new Error("Bank account not found");

    if (newData.cuttOffDay && newData.paydayLimit) {
        const cuttOffDay = new Date(newData.cuttOffDay),
            paydayLimit = new Date(newData.paydayLimit);
        checkDaysBetweenDates(cuttOffDay, paydayLimit);
    }

    if (newData.cuttOffDay) {
        const cuttOffDay = new Date(newData.cuttOffDay);
        checkDaysBetweenDates(cuttOffDay, bankAcc?.paydayLimit as Date);
    }

    if (newData.paydayLimit) {
        const paydayLimit = new Date(newData.paydayLimit);
        checkDaysBetweenDates(bankAcc?.cuttOffDay as Date, paydayLimit);
    }

    const updatedBankAcc = await BankAccount.findByIdAndUpdate(id, newData, {
        new: true,
    });
    return updatedBankAcc;
};

const deleteBankAccount = async (id: String) => {
    const bankAcc = await BankAccount.findByIdAndDelete(id);
    if (!bankAcc) throw new Error("Bank account not found");
    return bankAcc;
};

const bankAccountService = {
    createBankAccount,
    getBankAccounts,
    getUserBankAccounts,
    getBankAccount,
    updateBankAccount,
    deleteBankAccount,
};

function checkDaysBetweenDates(date1: Date, date2: Date) {
    const oneDay = 1000 * 60 * 60 * 24;
    const cuttOffDay = date1.getTime();
    const paydayLimit = date2.getTime();
    const differenceMs = Math.abs(cuttOffDay - paydayLimit);
    const difference = Math.round(differenceMs / oneDay);
    if (difference < 10)
        throw new Error("Invalid dates, must be at least 10 days apart");
}
export default bankAccountService;

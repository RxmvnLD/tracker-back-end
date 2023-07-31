import User from "../models/User.model";
import { hash } from "bcryptjs";
import BankAccountModel from "../models/expensesTracker/BankAccount.model";
const getUser = async (id: String) => {
    const user = await User.findById(id);
    if ((user?.bankAccounts.length as number) > 0) {
        await user?.populate({ path: "bankAccounts", model: BankAccountModel });
    }
    return user;
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
    return user;
};

const deleteUser = async (id: String) => {
    const user = await User.findByIdAndDelete(id);
    return user;
};

const userService = { getUser, getUsers, updateUser, deleteUser };
export default userService;

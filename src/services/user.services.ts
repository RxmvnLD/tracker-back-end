import User from "../models/User.model";
const getUser = async (id: String) => {
    const user = await User.findById(id);
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
    let user = await User.findByIdAndUpdate(id, newData, {
        new: true,
    });
    if (!user) throw new Error("User not found");
    return user;
};

const deleteUser = async (id: String) => {
    await User.findByIdAndDelete(id);
    return;
};

const userService = { getUser, getUsers, updateUser, deleteUser };
export default userService;

import { Request, Response } from "express";
import userService from "../services/user.services";

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUser(req.user?.id as string);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        return res.status(400).json(error);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    const isAdmin = req.user?.isAdmin as boolean;
    if (!isAdmin)
        return res
            .status(401)
            .json({ message: "Route not allowed, unauthorized user" });
    try {
        const users = await userService.getUsers();
        if (!users) return res.status(404).json({ message: "Users not found" });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id as string,
            newData = req.body,
            updateUser = await userService.updateUser(id, newData);
        if (!updateUser)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json(updateUser);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        return res.status(400).json(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id as string;
        const user = await userService.deleteUser(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        return res.status(400).json(error);
    }
};

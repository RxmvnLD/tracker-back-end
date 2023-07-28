import { Request, Response } from "express";
import userService from "../services/user.services";
import Joi from "joi";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        if (!user) throw new Error("User not found");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    //Validate data
    try {
        const schema = Joi.object({
            username: Joi.string().min(3).max(30),
            email: Joi.string().email(),
            password: Joi.string().min(6).max(30),
        });
        await schema.validateAsync(req.body, { warnings: true });
    } catch (error: any) {
        const errorMsj = error.details[0].message;
        return res.status(400).json({ message: errorMsj });
    }
    //Call the service
    try {
        const { id } = req.params,
            newData = req.body,
            updateUser = await userService.updateUser(id, newData);
        return res.status(200).json(updateUser);
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(400).json(error);
    }
};

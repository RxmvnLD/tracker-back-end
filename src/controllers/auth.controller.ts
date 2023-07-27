import { Request, Response } from "express";
import User from "../models/User.model";
import { MongoServerError } from "mongodb";
import { hash, compare } from "bcryptjs";
import createToken from "../libs/jwt";
import Joi from "joi";
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //Validate fields
    if (!email || !password)
        return res
            .status(422)
            .json({ message: "Please. Send your email and password" });

    try {
        //Search for an existing user
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User not found" });

        //Validate password
        const validPassword = await compare(password, existingUser.password);
        if (!validPassword)
            return res.status(401).json({ message: "Invalid password" });

        //Create token
        const token = await createToken({ id: existingUser._id });
        //Save token as a cookie
        res.cookie("token", token, { httpOnly: true });
        const responseBody = {
            message: "User logged successfully",
            loggedUser: {
                username: existingUser.username,
                email: existingUser.email,
                id: existingUser._id,
                createdAt: existingUser.createdAt,
            },
        };
        //Send response
        return res.status(201).json(responseBody);
    } catch (error) {
        //Validate duplicated email
        if (error instanceof MongoServerError && error.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(400).json({ error });
    }
};

export const signup = async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;

    //Validate fields
    if (!confirmPassword)
        return res
            .status(422)
            .json({ message: "Please send the password confirmation." });
    try {
        const schema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(30).required(),
            confirmPassword: Joi.ref("password"),
        });
        await schema.validateAsync(req.body, { warnings: true });
    } catch (error: any) {
        const errorMsj = error.details[0].message;
        return res.status(400).json({ message: errorMsj });
    }

    try {
        //Create a new user and encrypt the password
        const newUser = new User({
            username,
            email,
            password: await hash(password, 12),
        });
        //Save user in the database
        const savedUser = await newUser.save();
        //Create token
        const token = await createToken({ id: savedUser._id });
        //Save token as a cookie
        res.cookie("token", token, { httpOnly: true });
        const responseBody = {
            message: "User created successfully",
            savedUser: {
                username: savedUser.username,
                email: savedUser.email,
                id: savedUser._id,
                createdAt: savedUser.createdAt,
            },
        };
        //Send response
        return res.status(201).json(responseBody);
    } catch (error) {
        //Validate duplicated email
        if (error instanceof MongoServerError && error.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(400).json({ error });
    }
};

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie("token");
    return res.json({ message: "User logged out" });
};

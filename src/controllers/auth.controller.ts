import { Request, Response } from "express";
import User from "../models/User.model";
import { MongoServerError } from "mongodb";
import { hash, compare } from "bcryptjs";
import createToken from "../libs/jwt";
import {
    loginSchema,
    signupSchema,
} from "../utils/validations/authValidations";
import jwt from "jsonwebtoken";
export const signup = async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword, isAdmin } = req.body;

    //Validate fields
    if (!confirmPassword)
        return res
            .status(422)
            .json({ message: "Please send the password confirmation." });
    try {
        await signupSchema.validateAsync(req.body, { warnings: true });
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
            isAdmin: isAdmin || false,
        });
        //Save user in the database
        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(404).json({ message: "ERROR CREATING USER" });
        }
        //Create token
        const tokenData = savedUser.isAdmin
            ? { id: savedUser._id, isAdmin: true }
            : { id: savedUser._id, isAdmin: false };
        const token = await createToken(tokenData);
        //Save token as a cookie
        const days = process.env.DAYS_TO_EXPIRE_COOKIE as string;
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3_600_000 * 24 * Number(days)),
            sameSite: "none",
            secure: true,
        });
        const responseBody = {
            message: "User created successfully",
            user: {
                username: savedUser.username,
                email: savedUser.email,
                id: savedUser._id,
                token,
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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //Validate fields
    try {
        await loginSchema.validateAsync(req.body, { warnings: true });
    } catch (error: any) {
        const errorMsj = error.details[0].message;
        return res.status(400).json({ message: errorMsj });
    }

    try {
        //Search for an existing user
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res
                .status(404)
                .json({ message: "User not found, check your email" });

        //Validate password
        const validPassword = await compare(password, existingUser.password);
        if (!validPassword)
            return res.status(400).json({ message: "Invalid password" });

        //Create token
        const tokenData = existingUser.isAdmin
            ? { id: existingUser._id, isAdmin: true }
            : { id: existingUser._id, isAdmin: false };
        const token = await createToken(tokenData);
        //Save token as a cookie
        const days = process.env.DAYS_TO_EXPIRE_COOKIE as string;
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3_600_000 * 24 * Number(days)),
            secure: true,
            sameSite: "none",
        });
        const responseBody = {
            message: "User logged successfully",
            user: {
                username: existingUser.username,
                email: existingUser.email,
                id: existingUser._id,
                token,
            },
        };
        //Send response
        return res.status(200).json(responseBody);
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

export const verify = async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Credentials", "true");
    const { token: cookiesToken } = req.cookies;

    // If there isnt a token in the cookies, use the token from the authorization header
    if (!cookiesToken) {
        const bearerToken = req.headers.authorization?.split(" ")[1];
        if (!bearerToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            jwt.verify(bearerToken, process.env.JWT_SECRET as string);
        } catch (error: any) {
            console.log(error);
            res.clearCookie("token");
            return res
                .status(401)
                .json({ message: "Invalid or expired token" });
        }
    }
    try {
        jwt.verify(cookiesToken, process.env.JWT_SECRET as string);
    } catch (error: any) {
        console.log(error.message);
        res.clearCookie("token");
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    return res.status(200).json({ message: "Valid token" });
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenUserData } from "../interfaces";

export const authRequired = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = user as tokenUserData;
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
    return next();
};

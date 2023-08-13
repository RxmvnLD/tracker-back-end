import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenUserData } from "../interfaces";

export const authRequired = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    /* res.header("Access-Control-Allow-Credentials", "true");
    const { token } = req.cookies;
    console.log(req.cookies); */

    const token = req.headers.authorization?.split(" ")[1];
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

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenUserData } from "../interfaces";

export const authRequired = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.header("Access-Control-Allow-Credentials", "true");
    const { token: cookiesToken } = req.cookies;

    // If there isnt a token in the cookies, use the token from the authorization header
    if (!cookiesToken) {
        const bearerToken = req.headers.authorization?.split(" ")[1];
        if (!bearerToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const user = jwt.verify(
                bearerToken,
                process.env.JWT_SECRET as string,
            );
            req.user = user as tokenUserData;
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid token" });
        }
        return next();
    }

    try {
        const user = jwt.verify(cookiesToken, process.env.JWT_SECRET as string);
        req.user = user as tokenUserData;
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
    return next();
};

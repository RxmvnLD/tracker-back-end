import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
export const schemaValidator =
    (schema: ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            return next();
        } catch (error: any) {
            console.log(error);
            const errorMsj = `${error.details[0].message} is required`;
            return res.status(400).json({ message: errorMsj });
        }
    };

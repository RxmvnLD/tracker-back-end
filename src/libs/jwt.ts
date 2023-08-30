import { sign } from "jsonwebtoken";

const createToken = (payload: object) => {
    return new Promise((resolve, reject) => {
        sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN as string },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });
};

export default createToken;

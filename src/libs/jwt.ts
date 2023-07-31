import { sign } from "jsonwebtoken";

const createToken = (payload: object) => {
    return new Promise((resolve, reject) => {
        sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });
};

export default createToken;

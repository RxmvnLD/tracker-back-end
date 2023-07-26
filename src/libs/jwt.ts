import { sign } from "jsonwebtoken";

const createToken = (payload: object) => {
    return new Promise((resolve, reject) => {
        console.log(process.env.SECRET_KEY);
        sign(
            payload,
            process.env.TOKEN_SECRET as string,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });
};

export default createToken;

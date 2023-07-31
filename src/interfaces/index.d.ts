import { JwtPayload } from "jsonwebtoken";
export interface tokenUserData extends JwtPayload {
    id: string;
    isAdmin: boolean;
}
declare global {
    declare namespace Express {
        interface Request {
            user?: tokenUserData;
        }
    }
}

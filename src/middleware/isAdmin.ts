import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./authenticate";
import { Role } from "../model/user";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user.role != Role.ADMIN) {
        return res.status(403).json({ message: "Access denied. Admins only!" });
    }
    next();
}
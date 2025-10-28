import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import {
  FORBIDDEN,
  FORBIDDEN_REASON,
  UNAUTHORIZED,
  UNAUTHORIZED_REASON,
} from "../utils/statusCodes";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwt: string = process.env.JWT_SECRET as string;

export const checkToken = (req: Request, _res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token)
    throw new AppError("Token is not found", UNAUTHORIZED, UNAUTHORIZED_REASON);

  verify(token, jwt, (error, user) => {
    if (error) throw new AppError("Invalid or expired token", FORBIDDEN, FORBIDDEN_REASON);
    (req as any).user = user;
    next();
  });
};

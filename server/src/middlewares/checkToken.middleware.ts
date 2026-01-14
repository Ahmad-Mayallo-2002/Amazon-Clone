import { NextFunction, Request, Response } from "express";
import {
  FORBIDDEN,
  FORBIDDEN_REASON,
  UNAUTHORIZED,
  UNAUTHORIZED_REASON,
} from "../utils/statusCodes";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import AppError from "../utils/appError";

config();

const { JWT_SECRET } = process.env;

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization!;
    const token = authHeader.split(" ")[1];

    if (!authHeader || !token)
      throw new AppError(
        "Token is not found",
        UNAUTHORIZED,
        UNAUTHORIZED_REASON
      );

    
    verify(token, `${JWT_SECRET}`, (error, user) => {
      if (error)
        throw new AppError(
          "Invalid or expired token",
          FORBIDDEN,
          FORBIDDEN_REASON
        );

      (req as any).user = user;
      return next();
    });
  } catch (error) {
    next(error);
  }
};

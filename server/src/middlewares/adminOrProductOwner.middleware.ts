import { NextFunction, Request, Response } from "express";
import { Roles } from "../enums/role.enum";
import AppError from "../utils/appError";
import {
  FORBIDDEN,
  FORBIDDEN_REASON,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_REASON,
} from "../utils/statusCodes";

export const adminOrProductOwner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (user.role === Roles.ADMIN || user.vendorId === req.params.vendorId) {
      return next();
    }
    throw new AppError(
      "You are not own this product",
      FORBIDDEN,
      FORBIDDEN_REASON
    );
  } catch (error) {
    throw new AppError(
      INTERNAL_SERVER_ERROR_REASON,
      INTERNAL_SERVER_ERROR,
      INTERNAL_SERVER_ERROR_REASON
    );
  }
};

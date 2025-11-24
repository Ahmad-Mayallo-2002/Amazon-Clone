import { NextFunction, Request, Response } from "express";
import AppError from "./appError";
import {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_REASON,
} from "./statusCodes";

function globalErrorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status: number = (err as AppError).status || INTERNAL_SERVER_ERROR;
  const message: string =
    (err as AppError).message || INTERNAL_SERVER_ERROR_REASON;
  const error: string = (err as AppError).error || INTERNAL_SERVER_ERROR_REASON;

  res.status(status).json({ status, message, error });
}

export default globalErrorHandler;

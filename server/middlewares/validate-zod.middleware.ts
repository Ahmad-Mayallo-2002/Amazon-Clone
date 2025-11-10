import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { NOT_FOUND } from "../utils/statusCodes";
import { ZodType } from "zod";

export const validateZod =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success)
      throw new AppError(
        "Validation failed",
        NOT_FOUND,
        result.error.flatten().fieldErrors
      );

    req.body = result.data;
    next;
  };

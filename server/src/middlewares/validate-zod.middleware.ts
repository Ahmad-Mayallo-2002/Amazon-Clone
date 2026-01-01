import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { BAD_REQUEST } from "../utils/statusCodes";
import { treeifyError, ZodType } from "zod";

export const validateZod =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.log(result.data, req.body);
      const errors = (treeifyError(result.error) as any).properties;
      throw new AppError("Validation failed", BAD_REQUEST, errors);
    }
    req.body = result.data;
    next();
  };

import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { BAD_REQUEST } from "../utils/statusCodes";
import { treeifyError, ZodType } from "zod";

export const validateZod =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    if (req.body.price) req.body.price = +req.body.price;
    if (req.body.stock) req.body.stock = +req.body.stock;
    if (req.body.discount) req.body.discount = +req.body.discount;
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = (treeifyError(result.error) as any).properties;
      throw new AppError("Validation failed", BAD_REQUEST, errors);
    }
    req.body = result.data;
    next();
  };

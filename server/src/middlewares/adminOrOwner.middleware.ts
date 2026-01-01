import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { FORBIDDEN, FORBIDDEN_REASON } from "../utils/statusCodes";
import { Roles } from "../enums/role.enum";

export function adminOrOwner(getId: (req: Request) => string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { role, id, vendorId } = (req as any).user;
    const targetId = getId(req);
    if (role === Roles.ADMIN || id === targetId || vendorId === targetId) {
      return next();
    } else {
      throw new AppError(
        FORBIDDEN_REASON,
        FORBIDDEN,
        "You do not have permission to perform this action"
      );
    }
  };
}

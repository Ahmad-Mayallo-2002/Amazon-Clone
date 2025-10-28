import { Response, Request, NextFunction } from "express";
import { Roles } from "../enums/role.enum";
import AppError from "../utils/appError";
import { FORBIDDEN, FORBIDDEN_REASON } from "../utils/statusCodes";

export const authorizeRoles =
  (...roles: Roles[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    (req as any).user = { role: "asd" };

    const role: Roles = (req as any).user.role;

    if (!roles.includes(role))
      throw new AppError(
        `Access is denied. Allowed roles:  ${roles.join(", ")}`,
        FORBIDDEN,
        FORBIDDEN_REASON
      );

    next();
  };

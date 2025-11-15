import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Vendor } from "../vendor/vendor.entity";
import AppError from "../utils/appError";
import {
  FORBIDDEN,
  FORBIDDEN_REASON,
  NOT_FOUND,
  NOT_FOUND_REASON,
} from "../utils/statusCodes";

export const verifyVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendorId: string = (req as any).user.vendorId;
    const vendorRepo: Repository<Vendor> = AppDataSource.getRepository(Vendor);
    const vendor = await vendorRepo.findOne({
      where: { id: vendorId },
      select: ["id", "isVerified"],
    });

    if (!vendor)
      throw new AppError("Vendor not found", NOT_FOUND, NOT_FOUND_REASON);

    if (!vendor.isVerified)
      throw new AppError("You are not verified", FORBIDDEN, FORBIDDEN_REASON);

    next();
  } catch (error) {
    next(error);
  }
};

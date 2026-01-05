import { inject, injectable } from "inversify";
import { VendorService } from "./vendor.service";
import { NextFunction, Request, Response } from "express";
import { OK, OK_REASON } from "../utils/statusCodes";
import { sendResponse } from "../utils/sendResponse";

@injectable()
export class VendorController {
  constructor(@inject(VendorService) private vendorService: VendorService) {}

  getVendors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.vendorService.getVendors(
        Number(skip) || 0,
        Number(take) || 10
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getVendorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const vendor = await this.vendorService.getVendor(id);
      return sendResponse(res, vendor, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  updateVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.vendorService.updateVendor(id, data);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.vendorService.deleteVendor(id);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  verifyVendorExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await this.vendorService.verifyVendorExists(id, status);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

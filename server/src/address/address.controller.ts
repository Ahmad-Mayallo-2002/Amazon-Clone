import { inject, injectable } from "inversify";
import { AddressService } from "./address.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class AddressController {
  constructor(@inject(AddressService) private addressService: AddressService) {}

  createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await this.addressService.create(req.body);
      return sendResponse(res, address, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };

  getAllAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.addressService.getAll(
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await this.addressService.getById(req.params.id);
      return sendResponse(res, address, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getAddressesByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.addressService.getByUserId(
        req.params.userId,
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.addressService.updateAddress(
        req.params.id,
        req.body
      );
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.addressService.removeAddress(req.params.id);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}

import { inject, injectable } from "inversify";
import { UserService } from "./user.service";
import { sendResponse } from "../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.userService.getUsers(
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);
      return sendResponse(res, user, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.userService.updateUser(id, data);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.deleteUser(id);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}

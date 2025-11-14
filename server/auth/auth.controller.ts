import { inject, injectable } from "inversify";
import { AuthService } from "./auth.service";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";
import { log } from "console";

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      return sendResponse(res, result, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };

  registerVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.registerVendor(req.body);
      return sendResponse(res, result, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this.authService.forgotPassword(email);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  verifyCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;
      const result = await this.authService.verifyCode(code);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, confirmPassword } = req.body;
      const result = await this.authService.resetPassword(
        email,
        password,
        confirmPassword
      );
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  seedAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.seedAdmin();
      return sendResponse(res, result, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };
}

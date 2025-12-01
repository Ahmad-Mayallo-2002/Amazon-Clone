import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import {
  FORBIDDEN,
  FORBIDDEN_REASON,
  UNAUTHORIZED,
  UNAUTHORIZED_REASON,
} from "../utils/statusCodes";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";

config();

const { JWT_SECRET, GOOGLE_CLIENT_ID } = process.env;

const jwt: string = JWT_SECRET!;
const client = new OAuth2Client(GOOGLE_CLIENT_ID!);

export const checkToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  const tokenId: string | undefined = (req.user as any).tokenId;

  if (!token && !tokenId)
    throw new AppError("Token is not found", UNAUTHORIZED, UNAUTHORIZED_REASON);

  if (token)
    verify(token, jwt, (error, user) => {
      if (error)
        throw new AppError(
          "Invalid or expired token",
          FORBIDDEN,
          FORBIDDEN_REASON
        );
      (req as any).user = user;
      next();
    });

  if (tokenId) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = payload;
      (req.user as any).token = tokenId;
      next();
    } catch (err) {
      return next(
        new AppError(
          "Invalid or expired Google token.",
          UNAUTHORIZED,
          UNAUTHORIZED_REASON
        )
      );
    }
  }
};

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
  try {
    const authHeader = req.headers.authorization;
    const googleToken = req.headers["x-google-token"] as string | undefined;

    if (!authHeader && !googleToken)
      throw new AppError(
        "Token is not found",
        UNAUTHORIZED,
        UNAUTHORIZED_REASON
      );

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      verify(token, jwt, (error, user) => {
        if (error) {
          throw new AppError(
            "Invalid or expired token",
            FORBIDDEN,
            FORBIDDEN_REASON
          );
        }
        (req as any).user = user;
        next();
      });
      return;
    }

    if (googleToken) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: googleToken,
          audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        req.user = payload;
        (req.user as any).provider = "google";
        next();
      } catch (error) {
        throw new AppError(
          "Invalid or expired Google token",
          UNAUTHORIZED,
          UNAUTHORIZED_REASON
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

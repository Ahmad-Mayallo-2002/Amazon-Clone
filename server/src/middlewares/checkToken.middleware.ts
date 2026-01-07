import { NextFunction, Request, Response } from "express";
import {
  FORBIDDEN,
  FORBIDDEN_REASON,
  UNAUTHORIZED,
  UNAUTHORIZED_REASON,
} from "../utils/statusCodes";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { sendResponse } from "../utils/sendResponse";

config();

const { JWT_SECRET, GOOGLE_CLIENT_ID } = process.env;

const jwt: string = JWT_SECRET!;
const client = new OAuth2Client(GOOGLE_CLIENT_ID!);

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const googleToken = req.headers["x-google-token"] as string | undefined;

    if (!authHeader && !googleToken)
      return sendResponse(
        res,
        UNAUTHORIZED_REASON,
        UNAUTHORIZED,
        "Token is not found"
      );

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      verify(token, jwt, (error, user) => {
        if (error)
          return sendResponse(
            res,
            FORBIDDEN_REASON,
            FORBIDDEN,
            "Invalid or expired token"
          );

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
        return sendResponse(
          res,
          UNAUTHORIZED_REASON,
          UNAUTHORIZED,
          "Invalid or expired Google token"
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

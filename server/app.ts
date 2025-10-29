import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { log } from "console";
import "./data-source";
import globalErrorHandler from "./utils/errorHandler";
import AppError from "./utils/appError";
import {
  NOT_FOUND,
  NOT_FOUND_REASON,
  OK,
  OK_REASON,
} from "./utils/statusCodes";
import { sendResponse } from "./utils/sendResponse";
import { upload } from "./utils/multer";
import { cloudinaryUpload } from "./utils/cloudinaryUpload";

const app = express();
const port: number = parseInt(process.env.PORT as string);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "images")));

app.get("/", async (_req: Request, res: Response) =>
  sendResponse(res, "Hello, World!", OK, OK_REASON)
);

app.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      NOT_FOUND,
      NOT_FOUND_REASON
    )
  );
});

app.use(globalErrorHandler);

app.listen(port, () => log(`http://localhost:${port}`));

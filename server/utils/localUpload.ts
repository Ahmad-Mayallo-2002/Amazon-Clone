import { writeFile } from "fs";
import { join } from "path";
import AppError from "./appError";
import { IUploadStrategy } from "../interfaces/uploadStrategy.interface";
import {
  BAD_REQUEST,
  BAD_REQUEST_REASON,
  NOT_FOUND,
  NOT_FOUND_REASON,
} from "./statusCodes";

export class LocalUpload implements IUploadStrategy {
  upload = async (file: Express.Multer.File) => {
    if (!file)
      throw new AppError("File is not exist", NOT_FOUND, NOT_FOUND_REASON);
    const newName = file.originalname.replace(".", "-" + Date.now() + ".");
    const destination = join(__dirname, "../images", newName);
    writeFile(destination, file.buffer, (err) => {
      if (err) throw new AppError(err.message, BAD_REQUEST, BAD_REQUEST_REASON);
    });
    return newName;
  };
}

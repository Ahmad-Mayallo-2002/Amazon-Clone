import { v2, UploadApiResponse } from "cloudinary";
import { config } from "dotenv";
import AppError from "./appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "./statusCodes";

config();

const {
  CLOUDINARY_NAME: cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
} = process.env;

export async function cloudinaryUpload(
  file: Express.Multer.File
): Promise<UploadApiResponse> {
  if (!file) throw new AppError('File is not exist', NOT_FOUND, NOT_FOUND_REASON)
  v2.config({
    cloud_name,
    api_key,
    api_secret,
  });
  return await new Promise((resolve, reject) => {
    const stream = v2.uploader.upload_stream(
      { folder: "amazon" },
      (error, result) => {
        if (error) return reject(error);
        if (result) return resolve(result);
      }
    );

    stream.end(file.buffer);
  });
}

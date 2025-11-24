import { UploadApiResponse } from "cloudinary";

export interface IUploadStrategy {
  upload(file: Express.Multer.File): Promise<string | UploadApiResponse>;
}

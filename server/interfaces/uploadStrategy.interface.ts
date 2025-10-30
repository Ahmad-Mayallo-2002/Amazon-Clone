import type { Express } from "express";
import type { Multer } from "multer";
import { UploadApiResponse } from "cloudinary";

export interface IUploadStrategy {
  upload(file: Express.Multer.File): Promise<string | UploadApiResponse>;
}

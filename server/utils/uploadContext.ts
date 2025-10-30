import { IUploadStrategy } from "../interfaces/uploadStrategy.interface";

export class UploadContext {
  constructor(private uploadStrategy: IUploadStrategy) {
    this.uploadStrategy = uploadStrategy;
  }

  public setStrategy(uploadStrategy: IUploadStrategy) {
    this.uploadStrategy = uploadStrategy;
  }

  public async performStrategy(file: Express.Multer.File) {
    await this.uploadStrategy.upload(file);
  }
}

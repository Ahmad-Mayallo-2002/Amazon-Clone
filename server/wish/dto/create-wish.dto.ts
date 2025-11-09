import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateWishDTO {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

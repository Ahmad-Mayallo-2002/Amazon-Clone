import { IsInt, IsNotEmpty, IsUUID } from "class-validator";

export class CreateReviewDTO {
  @IsNotEmpty()
  @IsInt()
  value: number;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

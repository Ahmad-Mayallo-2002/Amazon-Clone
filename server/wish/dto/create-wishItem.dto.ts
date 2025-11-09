import { IsNotEmpty, IsUUID } from "class-validator";

export class WishItemDTO {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;
}

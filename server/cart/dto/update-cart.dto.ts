import { IsDecimal, IsNotEmpty } from "class-validator";

export class UpdateCartDTO {
  @IsNotEmpty()
  @IsDecimal()
  totalPrice?: number;
}

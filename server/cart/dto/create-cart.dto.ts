import { IsDecimal, IsNotEmpty, IsUUID } from "class-validator";

export class CreateCartDTO {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsDecimal()
    totalPrice: number;
}
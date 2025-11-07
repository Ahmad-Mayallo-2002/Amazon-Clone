import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: { url: string; public_id: string };

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsDecimal()
  discount: number;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}

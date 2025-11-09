import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../../enums/role.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
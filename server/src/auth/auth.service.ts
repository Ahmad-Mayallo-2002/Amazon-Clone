import { injectable } from "inversify";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import {
  BAD_REQUEST,
  BAD_REQUEST_REASON,
  CONFLICT,
  CONFLICT_REASON,
  NOT_FOUND,
  NOT_FOUND_REASON,
} from "../utils/statusCodes";
import AppError from "../utils/appError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import { Roles } from "../enums/role.enum";
import { ILogin } from "../interfaces/login.interface";
import { sendVerificationCode } from "../utils/sendVerificationCode";
import { redis } from "../utils/redis";
import { CreateUser } from "../user/zod/user.zod";
import { Login } from "./zod/login.zod";
import { Vendor } from "../vendor/vendor.entity";
import { RegisterVendor } from "./zod/register-vendor.zod";

config();

@injectable()
export class AuthService {
  private userRepo: Repository<User> = AppDataSource.getRepository(User);
  private vendorRepo: Repository<Vendor> = AppDataSource.getRepository(Vendor);

  async register(data: CreateUser, role: Roles = Roles.USER): Promise<User> {
    const existingUser = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (existingUser)
      throw new AppError("User already exists", CONFLICT, CONFLICT_REASON);
    const user = this.userRepo.create({ ...data, role });
    user.password = await hash(user.password, 10);
    const newUser = await this.userRepo.save(user);
    return newUser;
  }

  async registerVendor(data: RegisterVendor): Promise<Vendor> {
    const { email, password, phone, storeDescription, storeName, username } =
      data;
    const user = await this.register(
      { username, email, password, phone },
      Roles.VENDOR
    );
    const vendor = this.vendorRepo.create({
      storeDescription,
      storeName,
      userId: user.id,
      user
    });
    return await this.vendorRepo.save(vendor);
  }

  async login(data: Login): Promise<ILogin> {
    const user = await this.userRepo.findOne({
      where: { email: data.email },
      relations: ["vendor"],
    });
    if (!user)
      throw new AppError("User not found", NOT_FOUND, NOT_FOUND_REASON);
    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid)
      throw new AppError("Invalid password", BAD_REQUEST, BAD_REQUEST_REASON);
    const payload: ILogin = { id: user.id, role: user.role, token: "" };
    if (user.role === Roles.VENDOR) payload.vendorId = user.vendor.id;
    const token = sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    payload.token = token;
    return payload;
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user)
      throw new AppError("User not found", NOT_FOUND, NOT_FOUND_REASON);
    const code = await sendVerificationCode(email);
    await redis.set(code, email, "EX", 60 * 10); // Code valid for 10 minutes
    return "Verification code sent to email";
  }

  async verifyCode(code: string): Promise<string> {
    const email = await redis.get(code);
    if (!email)
      throw new AppError(
        "Code not found or expired",
        NOT_FOUND,
        NOT_FOUND_REASON
      );
    await redis.del(code);
    return email;
  }

  async resetPassword(
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<string> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user)
      throw new AppError("User not found", NOT_FOUND, NOT_FOUND_REASON);
    if (password !== confirmPassword)
      throw new AppError(
        "Passwords do not match",
        BAD_REQUEST,
        BAD_REQUEST_REASON
      );
    user.password = await hash(confirmPassword, 10);
    await this.userRepo.save(user);
    return "Password reset successfully";
  }

  async seedAdmin(): Promise<string> {
    const existingAdmin = await this.userRepo.findOne({
      where: { role: Roles.ADMIN },
    });
    if (existingAdmin)
      throw new AppError(
        "Admin already exists",
        BAD_REQUEST,
        BAD_REQUEST_REASON
      );
    const admin = this.userRepo.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      role: Roles.ADMIN,
      phone: process.env.ADMIN_PHONE,
    });
    admin.password = await hash(`${process.env.ADMIN_PASSWORD}`, 10);
    await this.userRepo.save(admin);
    return "Admin user created successfully";
  }
}

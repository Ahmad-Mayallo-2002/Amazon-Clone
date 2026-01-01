import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Roles } from "../enums/role.enum";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { UpdateUser } from "./zod/user.zod";
import { PaginatedDate } from "../interfaces/paginated-data.interface";
import { calculatePagination } from "../utils/calculatePagination";

@injectable()
export class UserService {
  private userRepo: Repository<User> = AppDataSource.getRepository(User);

  async getUsers(skip: number = 0, take: number): Promise<PaginatedDate<User>> {
    const [users, count] = await this.userRepo.findAndCount({
      where: { role: Roles.USER },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!users.length)
      throw new AppError("No users found", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(count, skip, take);
    return { data: users, pagination };
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user)
      throw new AppError("User not found", NOT_FOUND, NOT_FOUND_REASON);
    return user;
  }

  async updateUser(id: string, data: UpdateUser): Promise<string> {
    const user = (await this.getUser(id)) as User;
    Object.assign(user, data);
    await this.userRepo.save(user);
    return "User updated successfully";
  }

  async deleteUser(id: string): Promise<string> {
    const user = (await this.getUser(id)) as User;
    await this.userRepo.remove(user);
    return "User deleted successfully";
  }
}

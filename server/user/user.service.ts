import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Roles } from "../enums/role.enum";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";

@injectable()
export class UserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userRepo.find({
      where: { role: Roles.USER },
    });
    if (!users.length)
      throw new AppError("No users found", NOT_FOUND, NOT_FOUND_REASON);
    return users;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id, role: Roles.USER },
    });
    if (!user)
      throw new AppError("User not found", NOT_FOUND, NOT_FOUND_REASON);
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const user = (await this.getUser(id)) as User;
    Object.assign(user, data);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = (await this.getUser(id)) as User;
    await this.userRepo.remove(user);
    return true;
  }
}

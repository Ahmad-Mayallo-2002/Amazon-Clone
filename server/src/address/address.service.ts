import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Address } from "./address.entity";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { CreateAddress, UpdateAddress } from "./zod/address.zod";
import { calculatePagination } from "../utils/calculatePagination";
import { PaginatedDate } from "../interfaces/paginated-data.interface";

@injectable()
export class AddressService {
  private addressRepo: Repository<Address> =
    AppDataSource.getRepository(Address);

  async getAll(skip: number, take: number): Promise<PaginatedDate<Address>> {
    const addresses = await this.addressRepo.find({ skip, take });
    const counts = await this.addressRepo.count();
    if (!counts)
      throw new AppError("No addresses found", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(counts, take, skip);
    return { data: addresses, pagination };
  }

  async getById(id: string): Promise<Address> {
    const address = await this.addressRepo.findOne({ where: { id } });
    if (!address)
      throw new AppError("Address not found", NOT_FOUND, NOT_FOUND_REASON);
    return address;
  }

  async getByUserId(userId: string, skip: number, take: number): Promise<PaginatedDate<Address>> {
    const addresses = await this.addressRepo.find({ where: { userId }, skip, take });
    const counts = await this.addressRepo.count({ where: { userId } });
    if (!counts)
      throw new AppError("No addresses found for this user", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(counts, take, skip);
    return { data: addresses, pagination };
  }

  async create(data: CreateAddress): Promise<Address> {
    const address = this.addressRepo.create(data);
    return this.addressRepo.save(address);
  }

  async updateAddress(id: string, updateData: UpdateAddress): Promise<string> {
    const address = await this.getById(id);
    Object.assign(address, updateData);
    await this.addressRepo.save(address);
    return "Address updated successfully";
  }

  async removeAddress(id: string): Promise<string> {
    const address = await this.getById(id);
    await this.addressRepo.remove(address);
    return "Address removed successfully";
  }
}

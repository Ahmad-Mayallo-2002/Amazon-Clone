import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Address } from "./address.entity";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { CreateAddress, UpdateAddress } from "./zod/address.zod";

@injectable()
export class AddressService {
  private addressRepo: Repository<Address>;

  constructor() {
    this.addressRepo = AppDataSource.getRepository(Address);
  }

  async getAll(): Promise<Address[]> {
    const addresses = await this.addressRepo.find();
    if (!addresses.length)
      throw new AppError("No addresses found", NOT_FOUND, NOT_FOUND_REASON);
    return addresses;
  }

  async getById(id: string): Promise<Address> {
    const address = await this.addressRepo.findOne({ where: { id } });
    if (!address)
      throw new AppError("Address not found", NOT_FOUND, NOT_FOUND_REASON);
    return address;
  }

  async getByUserId(userId: string): Promise<Address[]> {
    const addresses = await this.addressRepo.find({ where: { userId } });
    if (!addresses.length)
      throw new AppError(
        "No addresses found for this user",
        NOT_FOUND,
        NOT_FOUND_REASON
      );
    return addresses;
  }

  async create(data: CreateAddress): Promise<Address> {
    const address = this.addressRepo.create(data);
    return this.addressRepo.save(address);
  }

  async updateAddress(
    id: string,
    updateData: UpdateAddress
  ): Promise<string> {
    const address = await this.getById(id);
    Object.assign(address, updateData);
    await this.addressRepo.save(address);
    return 'Address updated successfully';
  }

  async removeAddress(id: string): Promise<string> {
    const address = await this.getById(id);
    await this.addressRepo.remove(address);
    return 'Address removed successfully';
  }
}

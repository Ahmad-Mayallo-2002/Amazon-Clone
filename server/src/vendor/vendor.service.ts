import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Vendor } from "./vendor.entity";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { UpdateVendor } from "./zod/vendor.zod";
import { PaginatedDate } from "../interfaces/paginated-data.interface";
import { IPagination } from "../interfaces/pagination.interface";
import { calculatePagination } from "../utils/calculatePagination";

@injectable()
export class VendorService {
  private vendorRepo = AppDataSource.getRepository(Vendor);

  async getVendors(
    skip: number = 0,
    take: number = 10
  ): Promise<PaginatedDate<Vendor>> {
    const [vendors, count] = await this.vendorRepo.findAndCount({
      relations: {
        user: true,
      },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!vendors.length)
      throw new AppError(NOT_FOUND_REASON, NOT_FOUND, "No vendors found");
    const pagination = calculatePagination(count, skip, take);
    return { data: vendors, pagination };
  }

  async getVendor(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepo.findOne({ where: { id } });
    if (!vendor)
      throw new AppError(NOT_FOUND_REASON, NOT_FOUND, `Vendor not found`);
    return vendor;
  }

  async updateVendor(id: string, data: UpdateVendor): Promise<string> {
    const vendor = await this.getVendor(id);
    Object.assign(vendor, data);
    await this.vendorRepo.save(vendor);
    return "Vendor updated successfully";
  }

  async deleteVendor(id: string): Promise<string> {
    const vendor = await this.getVendor(id);
    await this.vendorRepo.remove(vendor);
    return "Vendor deleted successfully";
  }

  async verifyVendorExists(id: string, status: boolean): Promise<string> {
    const vendor = await this.getVendor(id);
    if (!vendor)
      throw new AppError(NOT_FOUND_REASON, NOT_FOUND, `Vendor not found`);
    await this.vendorRepo.update(id, { isVerified: status });
    return `Vendor is ${status ? "verified" : "not verified"} successfully`;
  }
}

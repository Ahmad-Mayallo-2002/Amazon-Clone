import { Container } from "inversify";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";

export const vendorContainer = new Container();

vendorContainer.bind<VendorService>(VendorService).to(VendorService);
vendorContainer.bind<VendorController>(VendorController).to(VendorController);

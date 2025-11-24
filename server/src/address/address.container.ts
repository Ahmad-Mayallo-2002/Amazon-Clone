import { Container } from "inversify";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";

export const addressContainer = new Container();

addressContainer.bind<AddressService>(AddressService).toSelf();
addressContainer.bind<AddressController>(AddressController).toSelf();
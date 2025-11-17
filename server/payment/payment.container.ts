import { Container } from "inversify";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

export const paymentContainer = new Container();

paymentContainer.bind(PaymentService).toSelf();
paymentContainer.bind(PaymentController).toSelf();

import { inject, injectable } from "inversify";
import { PaymentService } from "./payment.service";

@injectable()
export class PaymentController {
  constructor(@inject(PaymentService) private paymentService: PaymentService) {}
}

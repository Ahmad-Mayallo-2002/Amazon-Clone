import { Request, Response, Router } from "express";
import { stripe } from "../utils/stripe";
import { AppDataSource } from "../data-source";
import { Payment } from "../payment/payment.entity";
import { Order } from "../order/order.entity";
import { PaymentStatus } from "../enums/payment-status.enum";
import { OrderStatus } from "../enums/order-status.enum";
import { sendResponse } from "../utils/sendResponse";
import { OK, OK_REASON } from "../utils/statusCodes";
import bodyParser from "body-parser";

const router = Router();

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    let event;

    const paymentRepo = AppDataSource.getRepository(Payment);
    const orderRepo = AppDataSource.getRepository(Order);

    const updatePaymentAndOrder = async (
      intentId: string,
      paymentStatus: PaymentStatus,
      orderStatus: OrderStatus
    ) => {
      const payment = await paymentRepo.findOne({
        where: { providerPaymentId: intentId },
      });
      if (!payment) return;
      await paymentRepo.update(
        { providerPaymentId: intentId },
        { status: paymentStatus }
      );
      await orderRepo.update({ id: payment.orderId }, { status: orderStatus });
    };

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.log(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        await updatePaymentAndOrder(
          event.data.object.id,
          PaymentStatus.PAID,
          OrderStatus.SHIPPED
        );
        break;
      case "payment_intent.payment_failed":
        await updatePaymentAndOrder(
          event.data.object.id,
          PaymentStatus.FAILED,
          OrderStatus.CANCELLED
        );
        break;
      case "charge.refunded": {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent as string;
        if (paymentIntentId) {
          await updatePaymentAndOrder(
            paymentIntentId,
            PaymentStatus.REFUNDED,
            OrderStatus.CANCELLED
          );
        }
      }
    }

    sendResponse(res, true, OK, OK_REASON);
  }
);

export default router;

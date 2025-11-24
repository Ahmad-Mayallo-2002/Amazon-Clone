import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const stripe = useStripe();
  const [message, setMessage] = useState("Verifying payment status...");

  useEffect(() => {
    if (!stripe) return;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setMessage("Payment verification failed. Missing client secret.");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage(`Payment Succeeded! Order ID: ${orderId}`);
          // Note: The payment succeeded webhook has already confirmed the order.
          break;
        case "processing":
          setMessage(
            "Payment processing. You will receive an email confirmation shortly."
          );
          break;
        case "requires_payment_method":
          setMessage("Payment failed. Please try another payment method.");
          break;
        default:
          setMessage("Something went wrong. Please check your order history.");
          break;
      }
    });
  }, [stripe, orderId]);

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>{message}</p>
    </div>
  );
};

export default OrderConfirmation;

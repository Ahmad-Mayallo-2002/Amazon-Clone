import React, { useState } from "react";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import type { Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Box, Button } from "@chakra-ui/react";

const API_BASE_URL = "http://localhost:3000/api";

// -----------------------------------------------------------
// 1. The PaymentForm Component (Child)
// This component REQUIRES the Elements context to be ready.
// -----------------------------------------------------------
const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmPayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // Retrieve the Order ID here if necessary, or pass it via props/context
    const orderId = "...";

    const paymentResult = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Must be a fully qualified URL for redirect
        return_url: `${window.location.origin}/order-confirmation/${orderId}`,
      },
      redirect: "if_required",
    });

    if (paymentResult.error) {
      setError(`Payment failed: ${paymentResult.error.message}`);
    }
    // If successful, Stripe redirects to return_url
    setLoading(false);
  };

  return (
    <form onSubmit={handleConfirmPayment}>
      <h3>Payment Details</h3>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {/* The PaymentElement relies on the clientSecret passed to the parent Elements */}
      <PaymentElement />

      <button type="submit" disabled={loading || !stripe}>
        {loading ? "Processing Payment..." : "Complete Payment"}
      </button>
    </form>
  );
};

// -----------------------------------------------------------
// 2. The OrderPage Component (Parent)
// This handles the API call and conditional rendering.
// -----------------------------------------------------------

const OrderPage = ({
  stripePromise,
}: {
  stripePromise: Stripe | PromiseLike<Stripe | null> | null;
}) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Configuration options for the Elements group
  const options: StripeElementsOptions = {
    clientSecret: clientSecret || "",
    appearance: {
      /* Customize colors/fonts here */
    },
  };

  // Example data you'd collect from a form
  const orderData = {
    city: "Example City",
    postalCode: "12345",
    provider: "STRIPE",
    state: "Example State",
    street: "123 Example St",
    country: "Example Country",
  };

  const createOrderAndGetClientSecret = async () => {
    setLoading(true);
    setError(null);
    setClientSecret(null); // Clear previous secret

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create-order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxYzQ3ODM1LWYzZTQtNDQ4My05NmEzLWY2OGUxMDk1MjA1MCIsInJvbGUiOiJVU0VSIiwidG9rZW4iOiIiLCJpYXQiOjE3NjQwMjEzNDMsImV4cCI6MTc2NDAyNDk0M30.0FEzxh10K7XsRvOTDYYm5T6ZWPl4iAGkCSacmA-PuEg`,
          },
        }
      );

      // Set the secret, which will cause the component to re-render
      // and render the <Elements> wrapper with the correct prop.

      setClientSecret(response.data.data.clientSecret);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>

      {/* Stage 1: Button to initiate the order and fetch the clientSecret */}
      {!clientSecret ? (
        <>
          {error && <div style={{ color: "red" }}>Error: {error}</div>}
          <Button onClick={createOrderAndGetClientSecret} disabled={loading}>
            {loading ? "Creating Order..." : "Place Order & Get Payment Form"}
          </Button>
        </>
      ) : (
        // Stage 2: Render Payment Form once clientSecret is available
        // This is where the error is fixed:
        // The <Elements> wrapper is rendered ONLY when clientSecret exists.
        <Box w="calc(100% - 32px)">
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        </Box>
      )}
    </div>
  );
};

export default OrderPage;

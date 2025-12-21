import OrderSummary from "@/components/checkout/OrderSummary";
import Payment from "@/components/checkout/Payment";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import type { CreateOrderRequest } from "@/interfaces/order";
import { stripePromise } from "@/utils/stripe";
import { Box, Grid, VStack, Separator, Container } from "@chakra-ui/react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";

export default function Checkout() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Box my={24}>
          <Container>
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={4}>
              {/* Left Column: Forms */}
              <VStack align="stretch" gap={8}>
                {/* Shipping Address */}
                <ShippingAddress />
                <CardElement />
              </VStack>

              {/* Right Column: Order Summary */}
              <OrderSummary />
            </Grid>
          </Container>
        </Box>
      </Elements>
    </>
  );
}

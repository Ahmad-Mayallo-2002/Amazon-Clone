import OrderSummary from "@/components/checkout/OrderSummary";
import Payment from "@/components/checkout/Payment";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import { Box, Grid, VStack, Separator, Container } from "@chakra-ui/react";

export default function Checkout() {
  return (
    <Box my={24}>
      <Container>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={4}>
          {/* Left Column: Forms */}
          <VStack align="stretch" gap={8}>
            {/* Shipping Address */}
            <ShippingAddress />

            <Separator />

            {/* Payment */}
            <Payment />
          </VStack>

          {/* Right Column: Order Summary */}
          <OrderSummary />
        </Grid>
      </Container>
    </Box>
  );
}

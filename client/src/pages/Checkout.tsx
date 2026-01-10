import OrderSummary from "@/components/checkout/OrderSummary";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import { stripePromise } from "@/utils/stripe";
import { Box, Grid, VStack, Container, Text, Heading } from "@chakra-ui/react";
import {
  Elements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": {
        color: "#a0aec0",
      },
      padding: "13",
    },
    invalid: {
      color: "#e53e3e",
    },
  },
};

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
                <Box borderWidth={1} className="panel">
                  <Heading size="md" mb={4}>
                    2. Payment Method
                  </Heading>

                  {/* Card Number */}
                  <Box mb={4}>
                    <Text mb={1} fontWeight={500} fontSize="sm">
                      Card Number
                    </Text>
                    <Box
                      px={3}
                      py={2.5}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      bg="white"
                    >
                      <CardNumberElement options={cardStyle} />
                    </Box>
                  </Box>

                  {/* Expiry + CVC */}
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text mb={1} fontWeight={500} fontSize="sm">
                        Expiry Date
                      </Text>
                      <Box
                        px={3}
                        py={2.5}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        bg="white"
                      >
                        <CardExpiryElement options={cardStyle} />
                      </Box>
                    </Box>

                    <Box>
                      <Text mb={1} fontWeight={500} fontSize="sm">
                        CVC
                      </Text>
                      <Box
                        px={3}
                        py={2.5}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        bg="white"
                      >
                        <CardCvcElement options={cardStyle} />
                      </Box>
                    </Box>
                  </Grid>
                </Box>
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

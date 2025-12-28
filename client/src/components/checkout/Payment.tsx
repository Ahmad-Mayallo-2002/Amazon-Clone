import { Box, Grid, Heading, Input, Field } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export default function Payment() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PaymentForm>();

  const onSubmit = (data: PaymentForm) => {
    console.log("Payment data:", data);
  };

  const { ErrorIcon, ErrorText, Root, Label } = Field;

  return (
    <Box borderWidth="1px" className="panel payment">
      <Heading size="md" mb={4}>
        2. Payment Method
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          {/* Card Number */}
          <Root>
            <Label>Card Number</Label>
            <Input
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                  message:
                    "Invalid card number format (e.g., 1234 5678 9012 3456)",
                },
              })}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <ErrorText>
                <ErrorIcon />
                {errors.cardNumber.message}
              </ErrorText>
            )}
          </Root>

          {/* Expiry Date */}
          <Root>
            <Label>Expiry Date</Label>
            <Input
              {...register("expiryDate", {
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Invalid format. Use MM/YY",
                },
              })}
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <ErrorText>
                <ErrorIcon />
                {errors.expiryDate.message}
              </ErrorText>
            )}
          </Root>

          {/* CVV */}
          <Root>
            <Label>CVV</Label>
            <Input
              {...register("cvv", {
                required: "CVV is required",
                pattern: {
                  value: /^\d{3,4}$/,
                  message: "CVV must be 3 or 4 digits",
                },
              })}
              placeholder="123"
              maxLength={4}
            />
            {errors.cvv && (
              <ErrorText>
                <ErrorIcon />
                {errors.cvv.message}
              </ErrorText>
            )}
          </Root>

          {/* Cardholder Name */}
          <Root>
            <Label>Cardholder Name</Label>
            <Input
              {...register("cardholderName", {
                required: "Cardholder name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              placeholder="John Doe"
            />
            {errors.cardholderName && (
              <ErrorText>
                <ErrorIcon />
                {errors.cardholderName.message}
              </ErrorText>
            )}
          </Root>
        </Grid>
      </form>
    </Box>
  );
}

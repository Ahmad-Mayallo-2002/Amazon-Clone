import { Box, Grid, Heading, Input, Field, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface ShippingAddressForm {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export default function ShippingAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressForm>();

  const onSubmit = (data: ShippingAddressForm) => {
    console.log("Form submitted:", data);
  };

  const { ErrorIcon, ErrorText, Label, RequiredIndicator, Root } = Field;

  return (
    <Box borderWidth="1px" className="panel shipping-address">
      <Heading size="md" mb={4}>
        1. Shipping Address
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gap={4} gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          {/* Full Name */}
          <Root invalid={!!errors.fullName}>
            <Label>
              Full Name <RequiredIndicator />
            </Label>
            <Input
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters",
                },
              })}
              placeholder="Enter your name"
            />
            {errors.fullName && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.fullName.message}
              </ErrorText>
            )}
          </Root>

          {/* Street Address */}
          <Root invalid={!!errors.street}>
            <Label>
              Street Address <RequiredIndicator />
            </Label>
            <Input
              {...register("street", {
                required: "Street address is required",
              })}
              placeholder="Enter your street"
            />
            {errors.street && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.street.message}
              </ErrorText>
            )}
          </Root>

          {/* City */}
          <Root invalid={!!errors.city}>
            <Label>
              City <RequiredIndicator />
            </Label>
            <Input
              {...register("city", {
                required: "City is required",
              })}
              placeholder="Enter your city"
            />
            {errors.city && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.city.message}
              </ErrorText>
            )}
          </Root>

          {/* State */}
          <Root invalid={!!errors.state}>
            <Label>
              State <RequiredIndicator />
            </Label>
            <Input
              {...register("state", {
                required: "State is required",
              })}
              placeholder="Enter your state"
            />
            {errors.state && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.state.message}
              </ErrorText>
            )}
          </Root>

          {/* Postal Code */}
          <Root invalid={!!errors.postalCode}>
            <Label>
              ZIP / Postal Code <RequiredIndicator />
            </Label>
            <Input
              {...register("postalCode", {
                required: "Postal code is required",
                pattern: {
                  value: /^\d{5}(-\d{4})?$/,
                  message: "Invalid postal code format",
                },
              })}
              placeholder="Enter your postal code"
            />
            {errors.postalCode && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.postalCode.message}
              </ErrorText>
            )}
          </Root>

          {/* Phone Number */}
          <Root invalid={!!errors.phone}>
            <Label>
              Phone Number <RequiredIndicator />
            </Label>
            <Input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Invalid phone number format",
                },
              })}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.phone.message}
              </ErrorText>
            )}
          </Root>
        </Grid>

        <Button type="submit" w="full" mt={6} className="main-button">
          Submit
        </Button>
      </form>
    </Box>
  );
}

import { usePost } from "@/hooks/usePost";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/interfaces/order";
import type { Response } from "@/interfaces/responses";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import { useCountry } from "@/zustand/selectCountry";
import { Box, Grid, Heading, Input, Field } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";

interface ShippingAddressForm {
  fullName: string;
  street: string;
  city: string;
  country: string;
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

  const payload = getPayload();

  const country = useCountry((state) => state.country);

  const stripe = useStripe();
  const elements = useElements();

  const mutationCreateOrder = usePost<
    CreateOrderRequest,
    Response<CreateOrderResponse>
  >({
    url: "create-order",
    onSuccess: () => {
      createToaster("Done", "Your order now is processed", "success");
    },
    onError: (error: any) => {
      createToaster("Error", "Something is error", "error");
      console.log(error);
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const onSubmit = async (data: ShippingAddressForm) => {
    data.country = country;

    if (!stripe || !elements) return;

    const { data: response } = await mutationCreateOrder.mutateAsync(data);

    const result = await stripe.confirmCardPayment(response.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          address: {
            city: data.city,
            state: data.state,
            country: "EG",
            postal_code: data.postalCode,
          },
        },
      },
    });

    if (result.error) {
      createToaster("Error", `${result.error.message}`, "error");
    } else {
      if (result.paymentIntent?.status === "succeeded") console.log("Done");
    }
  };

  const { ErrorIcon, ErrorText, Label, Root } = Field;

  return (
    <Box borderWidth="1px" className="panel shipping-address">
      <Heading size="md" mb={4}>
        1. Shipping Address
      </Heading>

      <form id="make-order" onSubmit={handleSubmit(onSubmit)}>
        <Grid gap={4} gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          {/* Full Name */}
          <Root invalid={!!errors.fullName}>
            <Label>Full Name</Label>
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
                <ErrorIcon />
                {errors.fullName.message}
              </ErrorText>
            )}
          </Root>

          {/* Street Address */}
          <Root invalid={!!errors.street}>
            <Label>Street Address</Label>
            <Input
              {...register("street", {
                required: "Street address is required",
              })}
              placeholder="Enter your street"
            />
            {errors.street && (
              <ErrorText>
                <ErrorIcon />
                {errors.street.message}
              </ErrorText>
            )}
          </Root>

          {/* City */}
          <Root invalid={!!errors.city}>
            <Label>City</Label>
            <Input
              {...register("city", {
                required: "City is required",
              })}
              placeholder="Enter your city"
            />
            {errors.city && (
              <ErrorText>
                <ErrorIcon />
                {errors.city.message}
              </ErrorText>
            )}
          </Root>

          {/* State */}
          <Root invalid={!!errors.state}>
            <Label>State</Label>
            <Input
              {...register("state", {
                required: "State is required",
              })}
              placeholder="Enter your state"
            />
            {errors.state && (
              <ErrorText>
                <ErrorIcon />
                {errors.state.message}
              </ErrorText>
            )}
          </Root>

          {/* Postal Code */}
          <Root invalid={!!errors.postalCode}>
            <Label>ZIP / Postal Code</Label>
            <Input
              {...register("postalCode", {
                required: "Postal code is required",
                pattern: {
                  value: /^\d{5}?$/,
                  message: "Invalid postal code format",
                },
              })}
              placeholder="Enter your postal code"
            />
            {errors.postalCode && (
              <ErrorText>
                <ErrorIcon />
                {errors.postalCode.message}
              </ErrorText>
            )}
          </Root>

          {/* Phone Number */}
          <Root invalid={!!errors.phone}>
            <Label>Phone Number</Label>
            <Input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+[1-9]\d{1,14}$/,
                  message: "Invalid Phone Number Syntax",
                },
              })}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <ErrorText>
                <ErrorIcon />
                {errors.phone.message}
              </ErrorText>
            )}
          </Root>
        </Grid>
      </form>
    </Box>
  );
}

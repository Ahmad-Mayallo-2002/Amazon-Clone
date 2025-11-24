import { Box, Button, Input } from "@chakra-ui/react";
import "./App.css";
import { stripePromise } from "./utils/stripe";
import axios from "axios";
import { mainApiEndPoint } from "./assets/assets";
import type { FormEvent } from "react";
import StripeProvider from "./components/custom/stripeProvider";
import OrderPage from "./components/custom/orderPage";

function App() {
  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        mainApiEndPoint + "create-order",
        {
          street: "asd",
          city: "asd",
          country: "asd",
          state: "asd",
          postalCode: "123",
          provider: "STRIPE",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxYzQ3ODM1LWYzZTQtNDQ4My05NmEzLWY2OGUxMDk1MjA1MCIsInJvbGUiOiJVU0VSIiwidG9rZW4iOiIiLCJpYXQiOjE3NjM5OTAzMzQsImV4cCI6MTc2Mzk5MzkzNH0.njScKdMdP2d3vajCxMNlzagsid6czkZ6wFqwjuI-6xc",
          },
        }
      );

      const clientSecret = res.data.data.clientSecret;
      const stripe = await stripePromise;
      const result = await stripe?.confirmCardPayment(clientSecret);
      if (result?.error) console.log(result?.error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
    const form = new FormData(ev.currentTarget);
    try {
      ev.preventDefault();
      const { data } = await axios.post(mainApiEndPoint + "login", {
        email: form.get("email"),
        password: form.get("password"),
      });
      console.log(data);
    } catch (error: any) {
      console.log(...form);
      console.log(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <Box p={4} gap={4} display="grid">
          <Input name="email" placeholder="Enter Your Email" />
          <Input
            name="password"
            placeholder="Enter Your Password"
            type="password"
          />
          <Button w="full" type="submit" colorPalette="blue">
            Login
          </Button>
        </Box>
      </form>

      <OrderPage stripePromise={stripePromise} />
    </>
  );
}

export default App;

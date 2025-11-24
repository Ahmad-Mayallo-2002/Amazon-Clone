import { stripePromise } from "@/utils/stripe";
import { Elements } from "@stripe/react-stripe-js";
import type { ReactNode } from "react";

function StripeProvider({children}: {children: ReactNode}) {
    return <Elements stripe={stripePromise}>{children}</Elements>
}

export default StripeProvider;
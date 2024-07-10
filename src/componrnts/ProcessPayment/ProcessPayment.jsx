import React from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OWal3JXxsUFsmifOzVnb8XXmfLA0jRl1wX4NES9gp0aIGHMyJ5zwSAgWOnUbTcRFYZEj5tb2lZ9MHrEh1sYj0qU00k7w9TeZ7"
);

export default function ProcessPayment() {
  const clientSecret = "{{sk_test_51OWal3JXxsUFsmifWbKF634ZBJAPs3MKHFMfGIXeo5Itxrolw3WpOE1ejLBocslaFRLXN9qR871dIFCekxMCxsOh009GPJ9abh}}";

  return (
    <Elements stripe={stripePromise}>
      <form>
        <PaymentElement clientSecret={clientSecret} />
        <button type="submit">Submit Payment</button>
      </form>
    </Elements>
  );
}

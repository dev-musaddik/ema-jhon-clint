import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51OWal3JXxsUFsmifOzVnb8XXmfLA0jRl1wX4NES9gp0aIGHMyJ5zwSAgWOnUbTcRFYZEj5tb2lZ9MHrEh1sYj0qU00k7w9TeZ7"
);

export default function ProcessPayment() {
  const options = {
    // passing the client secret obtained from the server
        clientSecret: "{{sk_test_51OWal3JXxsUFsmifWbKF634ZBJAPs3MKHFMfGIXeo5Itxrolw3WpOE1ejLBocslaFRLXN9qR871dIFCekxMCxsOh009GPJ9abh}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <form>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </Elements>
  );
}

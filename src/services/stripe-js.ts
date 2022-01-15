import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  const stripeJs = await loadStripe('pk_test_51KHFQPERrPAX5ucLssRiFHBkcGqvnrEt9bhwxgU1VEJ0E1wqnL50UL9yIlc7OasId7Rj4dFjRFb4vNj3xJ9LafkM002987oKCb')

  return stripeJs
}
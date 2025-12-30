import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY - payments will not work");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

/**
 * Consultation pricing (in cents)
 */
export const CONSULTATION_PRICES = {
  EDUCATION: 5000, // $50
  EMPLOYMENT: 7500, // $75
  TRAVEL: 5000, // $50
  TRADE: 10000, // $100
  PARTNERSHIP: 15000, // $150
} as const;

/**
 * Create a payment intent for a booking
 */
export async function createPaymentIntent(
  type: keyof typeof CONSULTATION_PRICES,
  metadata?: Record<string, string>
) {
  const amount = CONSULTATION_PRICES[type];

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      type,
      ...metadata,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    amount,
    id: paymentIntent.id,
  };
}

/**
 * Verify a webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, secret);
}

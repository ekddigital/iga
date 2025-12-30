// Re-export all lib modules for cleaner imports
export { db } from "./db";
export * from "./utils";
export * from "./validations";
export { stripe, CONSULTATION_PRICES, createPaymentIntent } from "./stripe";
export {
  resend,
  sendBookingConfirmation,
  sendInquiryNotification,
} from "./email";
export * from "./upload";

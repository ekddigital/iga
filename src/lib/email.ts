import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("Missing RESEND_API_KEY - emails will not be sent");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Inspire Global Access <noreply@inspireglobalaccess.com>";

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(booking: {
  name: string;
  email: string;
  type: string;
  date: Date;
}) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: booking.email,
    subject: "Booking Confirmation - Inspire Global Access",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">Booking Confirmed!</h1>
        <p>Dear ${booking.name},</p>
        <p>Thank you for booking a consultation with Inspire Global Access.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Consultation Type:</strong> ${booking.type}</p>
          <p><strong>Date:</strong> ${booking.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
        </div>
        <p>Our team will contact you shortly to confirm the meeting details.</p>
        <p>If you have any questions, please don't hesitate to reach out.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Inspire Global Access Team</strong></p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send booking confirmation:", error);
    throw error;
  }

  return data;
}

/**
 * Send inquiry notification to admin
 */
export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  country: string;
  subject?: string;
  message: string;
  type: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@inspireglobalaccess.com";

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: adminEmail,
    subject: `New ${inquiry.type} Inquiry from ${inquiry.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">New Inquiry Received</h1>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${inquiry.name}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>Country:</strong> ${inquiry.country}</p>
          <p><strong>Type:</strong> ${inquiry.type}</p>
          ${
            inquiry.subject
              ? `<p><strong>Subject:</strong> ${inquiry.subject}</p>`
              : ""
          }
        </div>
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${inquiry.message}</p>
        <br/>
        <p><a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/admin/inquiries" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Dashboard</a></p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send inquiry notification:", error);
    throw error;
  }

  return data;
}

import { z } from "zod";

/**
 * Contact/Inquiry Form Schema
 */
export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(2, "Please select a country"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["GENERAL", "PARTNERSHIP"]).default("GENERAL"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/**
 * Booking Form Schema
 */
export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  country: z.string().min(2, "Please select a country"),
  type: z.enum(["EDUCATION", "EMPLOYMENT", "TRAVEL", "TRADE", "PARTNERSHIP"]),
  date: z.string().min(1, "Please select a date"),
  message: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/**
 * Opportunity Form Schema
 */
export const opSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.enum(["EDUCATION", "EMPLOYMENT", "TRAVEL", "TRADE"]),
  location: z.string().min(2, "Location is required"),
  partner: z.string().min(2, "Partner name is required"),
  desc: z.string().min(20, "Description must be at least 20 characters"),
  reqs: z.string().min(5, "Requirements are required"),
  deadline: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type OpInput = z.infer<typeof opSchema>;

/**
 * Blog Post Form Schema
 */
export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().optional(),
  content: z.string().min(50, "Content must be at least 50 characters"),
  image: z.string().url().optional().or(z.literal("")),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  isPublished: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

export type PostInput = z.infer<typeof postSchema>;

/**
 * User/Auth Schema
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Validate data against a schema
 */
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    errors[path] = issue.message;
  }

  return { success: false, errors };
}

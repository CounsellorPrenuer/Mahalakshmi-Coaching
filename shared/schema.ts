import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions, {
  name: (schema) => schema,
  email: (schema) => schema,
  phone: (schema) => schema,
  service: (schema) => schema,
  message: (schema) => schema,
}).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
});
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Button click analytics
export const buttonClicks = pgTable("button_clicks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  buttonId: text("button_id").notNull(),
  buttonName: text("button_name").notNull(),
  section: text("section").notNull(),
  clickCount: integer("click_count").default(0).notNull(),
  lastClicked: timestamp("last_clicked").defaultNow().notNull(),
});

export type ButtonClick = typeof buttonClicks.$inferSelect;

// Page views analytics
export const pageViews = pgTable("page_views", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  pagePath: text("page_path").notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  lastViewed: timestamp("last_viewed").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;

// Payment records
export const payments = pgTable("payments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  razorpayOrderId: text("razorpay_order_id").notNull(),
  razorpayPaymentId: text("razorpay_payment_id"),
  amount: integer("amount").notNull(),
  currency: text("currency").default("INR").notNull(),
  planName: text("plan_name").notNull(),
  category: text("category").notNull(),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  status: text("status").default("created").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;

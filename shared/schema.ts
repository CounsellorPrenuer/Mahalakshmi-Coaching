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

// Reviews/Testimonials
export const reviews = pgTable("reviews", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company"),
  content: text("content").notNull(),
  rating: integer("rating").default(5).notNull(),
  imageUrl: text("image_url"),
  isVisible: integer("is_visible").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  author: text("author").default("Mahalakshmi Mahadevan").notNull(),
  isPublished: integer("is_published").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;

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

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import Razorpay from "razorpay";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "pathfinder2024";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  let razorpay: Razorpay | null = null;

  if (razorpayKeyId && razorpayKeySecret) {
    razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
  }

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid form data" });
      }
      const submission = await storage.createContactSubmission(result.data);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Track button clicks
  app.post("/api/track-click", async (req, res) => {
    try {
      const { buttonId, buttonName, section } = req.body;
      if (!buttonId || !buttonName || !section) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      await storage.trackButtonClick(buttonId, buttonName, section);
      res.json({ success: true });
    } catch (error) {
      console.error("Click tracking error:", error);
      res.status(500).json({ error: "Failed to track click" });
    }
  });

  // Track page views
  app.post("/api/track-pageview", async (req, res) => {
    try {
      const { pagePath } = req.body;
      if (!pagePath) {
        return res.status(400).json({ error: "Missing page path" });
      }
      await storage.trackPageView(pagePath);
      res.json({ success: true });
    } catch (error) {
      console.error("Page view tracking error:", error);
      res.status(500).json({ error: "Failed to track page view" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, token: "admin-authenticated" });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  // Admin endpoints
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error) {
      console.error("Contacts error:", error);
      res.status(500).json({ error: "Failed to get contacts" });
    }
  });

  app.patch("/api/admin/contacts/:id", async (req, res) => {
    try {
      const { status } = req.body;
      await storage.updateContactStatus(parseInt(req.params.id), status);
      res.json({ success: true });
    } catch (error) {
      console.error("Contact update error:", error);
      res.status(500).json({ error: "Failed to update contact" });
    }
  });

  app.get("/api/admin/button-clicks", async (req, res) => {
    try {
      const clicks = await storage.getButtonClicks();
      res.json(clicks);
    } catch (error) {
      console.error("Button clicks error:", error);
      res.status(500).json({ error: "Failed to get button clicks" });
    }
  });

  app.get("/api/admin/page-views", async (req, res) => {
    try {
      const views = await storage.getPageViews();
      res.json(views);
    } catch (error) {
      console.error("Page views error:", error);
      res.status(500).json({ error: "Failed to get page views" });
    }
  });

  app.get("/api/admin/payments", async (req, res) => {
    try {
      const payments = await storage.getPayments();
      res.json(payments);
    } catch (error) {
      console.error("Payments error:", error);
      res.status(500).json({ error: "Failed to get payments" });
    }
  });

  // Razorpay order creation
  app.post("/api/create-order", async (req, res) => {
    try {
      if (!razorpay || !razorpayKeyId) {
        return res.status(500).json({ error: "Payment gateway not configured" });
      }

      const { amount, currency, planName, category } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const options = {
        amount: amount * 100,
        currency: currency || "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          planName: planName || "",
          category: category || "",
        },
      };

      const order = await razorpay.orders.create(options);

      // Track the payment
      await storage.createPayment({
        razorpayOrderId: order.id,
        razorpayPaymentId: null,
        amount,
        currency: currency || "INR",
        planName: planName || "",
        category: category || "",
        customerName: null,
        customerEmail: null,
        customerPhone: null,
        status: "created",
      });

      res.json({
        order_id: order.id,
        currency: order.currency,
        amount: order.amount,
        key_id: razorpayKeyId,
      });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/verify-payment", async (req, res) => {
    try {
      if (!razorpayKeySecret) {
        return res.status(500).json({ success: false, error: "Payment gateway not configured" });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, error: "Missing payment details" });
      }

      const hmac = crypto.createHmac("sha256", razorpayKeySecret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature === razorpay_signature) {
        // Update payment status
        await storage.updatePaymentStatus(razorpay_order_id, razorpay_payment_id, "paid");

        res.json({ 
          success: true, 
          message: "Payment verified successfully",
          payment_id: razorpay_payment_id,
        });
      } else {
        res.status(400).json({ success: false, error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ success: false, error: "Verification failed" });
    }
  });

  return httpServer;
}

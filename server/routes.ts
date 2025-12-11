import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Razorpay from "razorpay";
import crypto from "crypto";

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

  app.post("/api/verify-payment", (req, res) => {
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

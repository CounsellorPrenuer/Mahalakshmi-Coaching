import { 
  type ContactSubmission, 
  type InsertContactSubmission,
  type ButtonClick,
  type PageView,
  type Payment
} from "@shared/schema";

export interface IStorage {
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactStatus(id: number, status: string): Promise<void>;
  
  // Button clicks
  trackButtonClick(buttonId: string, buttonName: string, section: string): Promise<void>;
  getButtonClicks(): Promise<ButtonClick[]>;
  
  // Page views
  trackPageView(pagePath: string): Promise<void>;
  getPageViews(): Promise<PageView[]>;
  
  // Payments
  createPayment(payment: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment>;
  getPayments(): Promise<Payment[]>;
  updatePaymentStatus(orderId: string, paymentId: string, status: string): Promise<void>;
  
  // Stats
  getStats(): Promise<{
    totalContacts: number;
    totalPayments: number;
    totalRevenue: number;
    totalPageViews: number;
  }>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private buttonClicks: Map<string, ButtonClick>;
  private pageViews: Map<string, PageView>;
  private payments: Map<number, Payment>;
  private idCounter: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.buttonClicks = new Map();
    this.pageViews = new Map();
    this.payments = new Map();
    this.idCounter = 1;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.idCounter++;
    const contactSubmission: ContactSubmission = {
      id,
      ...submission,
      status: "new",
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateContactStatus(id: number, status: string): Promise<void> {
    const submission = this.contactSubmissions.get(id);
    if (submission) {
      submission.status = status;
      this.contactSubmissions.set(id, submission);
    }
  }

  async trackButtonClick(buttonId: string, buttonName: string, section: string): Promise<void> {
    const existing = this.buttonClicks.get(buttonId);
    if (existing) {
      existing.clickCount++;
      existing.lastClicked = new Date();
      this.buttonClicks.set(buttonId, existing);
    } else {
      const click: ButtonClick = {
        id: this.idCounter++,
        buttonId,
        buttonName,
        section,
        clickCount: 1,
        lastClicked: new Date(),
      };
      this.buttonClicks.set(buttonId, click);
    }
  }

  async getButtonClicks(): Promise<ButtonClick[]> {
    return Array.from(this.buttonClicks.values()).sort(
      (a, b) => b.clickCount - a.clickCount
    );
  }

  async trackPageView(pagePath: string): Promise<void> {
    const existing = this.pageViews.get(pagePath);
    if (existing) {
      existing.viewCount++;
      existing.lastViewed = new Date();
      this.pageViews.set(pagePath, existing);
    } else {
      const view: PageView = {
        id: this.idCounter++,
        pagePath,
        viewCount: 1,
        lastViewed: new Date(),
      };
      this.pageViews.set(pagePath, view);
    }
  }

  async getPageViews(): Promise<PageView[]> {
    return Array.from(this.pageViews.values()).sort(
      (a, b) => b.viewCount - a.viewCount
    );
  }

  async createPayment(payment: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> {
    const id = this.idCounter++;
    const newPayment: Payment = {
      id,
      ...payment,
      createdAt: new Date(),
    };
    this.payments.set(id, newPayment);
    return newPayment;
  }

  async getPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updatePaymentStatus(orderId: string, paymentId: string, status: string): Promise<void> {
    const paymentsArray = Array.from(this.payments.values());
    for (const payment of paymentsArray) {
      if (payment.razorpayOrderId === orderId) {
        payment.razorpayPaymentId = paymentId;
        payment.status = status;
        this.payments.set(payment.id, payment);
        break;
      }
    }
  }

  async getStats(): Promise<{
    totalContacts: number;
    totalPayments: number;
    totalRevenue: number;
    totalPageViews: number;
  }> {
    const payments = Array.from(this.payments.values());
    const successfulPayments = payments.filter(p => p.status === 'paid');
    const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalPageViews = Array.from(this.pageViews.values()).reduce(
      (sum, p) => sum + p.viewCount, 0
    );

    return {
      totalContacts: this.contactSubmissions.size,
      totalPayments: successfulPayments.length,
      totalRevenue,
      totalPageViews,
    };
  }
}

export const storage = new MemStorage();

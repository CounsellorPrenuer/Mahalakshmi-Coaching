import { 
  type ContactSubmission, 
  type InsertContactSubmission,
  type ButtonClick,
  type PageView,
  type Payment,
  type Review,
  type BlogPost
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
  
  // Reviews
  createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review>;
  getReviews(): Promise<Review[]>;
  updateReview(id: number, review: Partial<Review>): Promise<void>;
  deleteReview(id: number): Promise<void>;
  
  // Blog posts
  createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, post: Partial<BlogPost>): Promise<void>;
  deleteBlogPost(id: number): Promise<void>;
  
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
  private reviews: Map<number, Review>;
  private blogPosts: Map<number, BlogPost>;
  private idCounter: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.buttonClicks = new Map();
    this.pageViews = new Map();
    this.payments = new Map();
    this.reviews = new Map();
    this.blogPosts = new Map();
    this.idCounter = 1;
    
    // Initialize with some sample reviews
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    const sampleReviews: Omit<Review, 'id' | 'createdAt'>[] = [
      {
        name: "Priya Sharma",
        role: "Software Engineer",
        company: "Microsoft",
        content: "Mahalakshmi's career guidance was transformative. She helped me transition from a stagnant role to my dream job at a top tech company. Her insights on resume building and interview prep were invaluable.",
        rating: 5,
        imageUrl: null,
        isVisible: 1,
      },
      {
        name: "Rahul Menon",
        role: "Product Manager",
        company: "Amazon",
        content: "The career path planning sessions helped me understand exactly what steps I needed to take to reach my goals. Within 6 months, I secured a PM role at a FAANG company!",
        rating: 5,
        imageUrl: null,
        isVisible: 1,
      },
      {
        name: "Anitha Krishnan",
        role: "College Student",
        company: "IIT Bangalore",
        content: "As a confused engineering student, the career guidance helped me discover my passion for data science. The personalized approach made all the difference.",
        rating: 5,
        imageUrl: null,
        isVisible: 1,
      },
    ];
    
    sampleReviews.forEach(review => {
      const id = this.idCounter++;
      this.reviews.set(id, { ...review, id, createdAt: new Date() });
    });
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

  // Reviews
  async createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const id = this.idCounter++;
    const newReview: Review = {
      id,
      ...review,
      createdAt: new Date(),
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateReview(id: number, review: Partial<Review>): Promise<void> {
    const existing = this.reviews.get(id);
    if (existing) {
      this.reviews.set(id, { ...existing, ...review });
    }
  }

  async deleteReview(id: number): Promise<void> {
    this.reviews.delete(id);
  }

  // Blog posts
  async createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const id = this.idCounter++;
    const now = new Date();
    const newPost: BlogPost = {
      id,
      ...post,
      createdAt: now,
      updatedAt: now,
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async updateBlogPost(id: number, post: Partial<BlogPost>): Promise<void> {
    const existing = this.blogPosts.get(id);
    if (existing) {
      this.blogPosts.set(id, { ...existing, ...post, updatedAt: new Date() });
    }
  }

  async deleteBlogPost(id: number): Promise<void> {
    this.blogPosts.delete(id);
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

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Lock, 
  Users, 
  CreditCard, 
  MousePointerClick, 
  Eye,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  RefreshCw,
  DollarSign,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Loader2
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactSubmission, ButtonClick, PageView, Payment } from "@shared/schema";

// All buttons on the website with their information
const allButtons = [
  // Navigation
  { id: "link-logo", name: "Logo", section: "Navigation", description: "Scrolls to home section" },
  { id: "link-nav-home", name: "Home Nav", section: "Navigation", description: "Scrolls to home section" },
  { id: "link-nav-about", name: "About Nav", section: "Navigation", description: "Scrolls to about section" },
  { id: "link-nav-services", name: "Services Nav", section: "Navigation", description: "Scrolls to services section" },
  { id: "link-nav-pricing", name: "Pricing Nav", section: "Navigation", description: "Scrolls to pricing section" },
  { id: "link-nav-testimonials", name: "Testimonials Nav", section: "Navigation", description: "Scrolls to testimonials section" },
  { id: "link-nav-contact", name: "Contact Nav", section: "Navigation", description: "Scrolls to contact section" },
  { id: "button-book-session", name: "Book Session (Header)", section: "Navigation", description: "Scrolls to contact form" },
  { id: "button-mobile-menu", name: "Mobile Menu Toggle", section: "Navigation", description: "Opens/closes mobile navigation" },
  
  // Hero Section
  { id: "button-hero-book-session", name: "Book Your Session", section: "Hero", description: "Scrolls to contact form" },
  { id: "button-hero-learn-more", name: "View Plans", section: "Hero", description: "Scrolls to pricing section" },
  
  // Services Section
  { id: "button-service-learn-career-guidance", name: "Career Guidance Learn More", section: "Services", description: "Opens career guidance detail page" },
  { id: "button-service-learn-career-path-planning", name: "Career Path Planning Learn More", section: "Services", description: "Opens career path planning detail page" },
  { id: "button-service-learn-resume-&-profile-building", name: "Resume Building Learn More", section: "Services", description: "Opens resume building detail page" },
  { id: "button-service-learn-interview-preparation", name: "Interview Prep Learn More", section: "Services", description: "Opens interview preparation detail page" },
  { id: "button-service-learn-leadership-coaching", name: "Leadership Coaching Learn More", section: "Services", description: "Opens leadership coaching detail page" },
  { id: "button-service-learn-behavioral-training", name: "Behavioral Training Learn More", section: "Services", description: "Opens behavioral training detail page" },
  
  // Pricing Section
  { id: "button-buy-standard", name: "Buy Standard Plan", section: "Pricing", description: "Initiates Razorpay payment for standard plan" },
  { id: "button-buy-premium", name: "Buy Premium Plan", section: "Pricing", description: "Initiates Razorpay payment for premium plan" },
  
  // Contact Section
  { id: "button-contact-submit", name: "Send Message", section: "Contact", description: "Submits contact form" },
  { id: "link-contact-email", name: "Email Link", section: "Contact", description: "Opens email client" },
  { id: "link-contact-phone", name: "Phone Link", section: "Contact", description: "Initiates phone call" },
  { id: "link-whatsapp", name: "WhatsApp Button", section: "Contact", description: "Opens WhatsApp chat" },
  { id: "link-linkedin", name: "LinkedIn Button", section: "Contact", description: "Opens LinkedIn profile" },
  { id: "button-book-call", name: "Book Discovery Call", section: "Contact", description: "Opens WhatsApp with pre-filled message" },
  
  // Footer
  { id: "footer-whatsapp", name: "Footer WhatsApp", section: "Footer", description: "Opens WhatsApp chat" },
  { id: "footer-linkedin", name: "Footer LinkedIn", section: "Footer", description: "Opens LinkedIn profile" },
  { id: "footer-email", name: "Footer Email", section: "Footer", description: "Opens email client" },
  
  // Service Detail Pages
  { id: "button-back-services", name: "Back to Services", section: "Service Detail", description: "Returns to main page services section" },
  { id: "button-get-started", name: "Get Started", section: "Service Detail", description: "Scrolls to pricing section" },
  { id: "button-whatsapp-inquiry", name: "Quick Inquiry", section: "Service Detail", description: "Opens WhatsApp for inquiry" },
  { id: "button-view-pricing", name: "View Pricing Plans", section: "Service Detail", description: "Scrolls to pricing section" },
  { id: "button-email-inquiry", name: "Email Inquiry", section: "Service Detail", description: "Opens email client" },
];

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await apiRequest("POST", "/api/admin/login", { password });
      if (res.ok) {
        localStorage.setItem("adminAuth", "true");
        onLogin();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-muted-foreground">Enter password to access dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-admin-password"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-purple-600"
                disabled={loading}
                data-testid="button-admin-login"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Access Dashboard
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Website
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend }: { 
  title: string; 
  value: string | number; 
  icon: typeof Users;
  trend?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
            {trend && (
              <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                {trend}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { data: stats, refetch: refetchStats } = useQuery<{
    totalContacts: number;
    totalPayments: number;
    totalRevenue: number;
    totalPageViews: number;
  }>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: contacts = [], refetch: refetchContacts } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: buttonClicks = [], refetch: refetchClicks } = useQuery<ButtonClick[]>({
    queryKey: ["/api/admin/button-clicks"],
  });

  const { data: pageViews = [], refetch: refetchViews } = useQuery<PageView[]>({
    queryKey: ["/api/admin/page-views"],
  });

  const { data: payments = [], refetch: refetchPayments } = useQuery<Payment[]>({
    queryKey: ["/api/admin/payments"],
  });

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/admin/contacts/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const refreshAll = () => {
    refetchStats();
    refetchContacts();
    refetchClicks();
    refetchViews();
    refetchPayments();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">New</Badge>;
      case "contacted":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Contacted</Badge>;
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Paid</Badge>;
      case "created":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-website">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <Button variant="outline" size="sm" onClick={refreshAll} data-testid="button-refresh">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Contacts"
            value={stats?.totalContacts || 0}
            icon={MessageSquare}
          />
          <StatCard
            title="Total Payments"
            value={stats?.totalPayments || 0}
            icon={CreditCard}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Page Views"
            value={stats?.totalPageViews || 0}
            icon={Eye}
          />
        </div>

        <Tabs defaultValue="buttons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="buttons" data-testid="tab-buttons">
              <MousePointerClick className="w-4 h-4 mr-2" />
              Buttons
            </TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">
              <Users className="w-4 h-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="payments" data-testid="tab-payments">
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="pages" data-testid="tab-pages">
              <Eye className="w-4 h-4 mr-2" />
              Pages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buttons">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointerClick className="w-5 h-5" />
                  All Website Buttons
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Complete list of all interactive buttons and their functions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["Navigation", "Hero", "Services", "Pricing", "Contact", "Footer", "Service Detail"].map(section => {
                    const sectionButtons = allButtons.filter(b => b.section === section);
                    if (sectionButtons.length === 0) return null;
                    
                    return (
                      <div key={section}>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Badge variant="outline">{section}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({sectionButtons.length} buttons)
                          </span>
                        </h3>
                        <div className="grid gap-3">
                          {sectionButtons.map(button => {
                            const clickData = buttonClicks.find(c => c.buttonId === button.id);
                            return (
                              <div
                                key={button.id}
                                className="flex items-center justify-between p-4 rounded-lg bg-card border"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <span className="font-medium text-foreground">{button.name}</span>
                                    <code className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                                      {button.id}
                                    </code>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {button.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-foreground">
                                    {clickData?.clickCount || 0}
                                  </div>
                                  <div className="text-xs text-muted-foreground">clicks</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Contact Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No contact submissions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map(contact => (
                      <div
                        key={contact.id}
                        className="p-4 rounded-lg bg-card border space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{contact.name}</span>
                              {getStatusBadge(contact.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {contact.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(contact.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Select
                            value={contact.status}
                            onValueChange={(value) => 
                              updateContactMutation.mutate({ id: contact.id, status: value })
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">{contact.service}</Badge>
                          <p className="text-sm text-muted-foreground">{contact.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No payments yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {payments.map(payment => (
                      <div
                        key={payment.id}
                        className="p-4 rounded-lg bg-card border"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{payment.planName}</span>
                              {getPaymentStatusBadge(payment.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>{payment.category}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(payment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-foreground">
                              ₹{payment.amount.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {payment.razorpayPaymentId || payment.razorpayOrderId}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Button Click Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {buttonClicks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MousePointerClick className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No click data yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {buttonClicks.slice(0, 20).map(click => (
                      <div
                        key={click.id}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-foreground text-sm">{click.buttonName}</span>
                            <span className="text-sm text-muted-foreground">{click.clickCount} clicks</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${Math.min((click.clickCount / (buttonClicks[0]?.clickCount || 1)) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Page Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pageViews.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No page view data yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pageViews.map(view => (
                      <div
                        key={view.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-card border"
                      >
                        <div>
                          <code className="text-sm font-medium text-foreground">{view.pagePath}</code>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last viewed: {new Date(view.lastViewed).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{view.viewCount}</div>
                          <div className="text-xs text-muted-foreground">views</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard />;
}

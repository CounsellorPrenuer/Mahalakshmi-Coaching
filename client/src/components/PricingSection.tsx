import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2, GraduationCap, BookOpen, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  planName: string;
  price: number;
  features: Feature[];
  isPopular?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: typeof GraduationCap;
  packages: {
    standard: Package;
    premium: Package;
  };
}

const categories: Category[] = [
  {
    id: "8-9",
    label: "8-9 Students",
    icon: BookOpen,
    packages: {
      standard: {
        planName: "Discover",
        price: 5500,
        features: [
          { text: "Psychometric assessment to measure your interests", included: true },
          { text: "1 career counselling session with expert career coaches", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV building during internship/graduation", included: false },
        ],
      },
      premium: {
        planName: "Discover Plus+",
        price: 15000,
        isPopular: true,
        features: [
          { text: "Psychometric assessments to measure interests, personality and abilities", included: true },
          { text: "8 career counselling sessions (1 every year) until graduation", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV building during internship/graduation", included: true },
        ],
      },
    },
  },
  {
    id: "10-12",
    label: "10-12 Students",
    icon: GraduationCap,
    packages: {
      standard: {
        planName: "Achieve Online",
        price: 5999,
        features: [
          { text: "Psychometric assessment to measure interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews during internship/graduation", included: false },
        ],
      },
      premium: {
        planName: "Achieve Plus+",
        price: 10599,
        isPopular: true,
        features: [
          { text: "Psychometric assessment to measure interests, personality and abilities", included: true },
          { text: "4 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews during internship/graduation", included: true },
        ],
      },
    },
  },
  {
    id: "college",
    label: "College Graduates",
    icon: Users,
    packages: {
      standard: {
        planName: "Ascend Online",
        price: 6499,
        features: [
          { text: "Psychometric assessment to measure interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports with certificate/online courses info", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
      },
      premium: {
        planName: "Ascend Plus+",
        price: 10599,
        isPopular: true,
        features: [
          { text: "Psychometric assessment to measure interests, personality and abilities", included: true },
          { text: "3 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports with certificate/online courses info", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
      },
    },
  },
  {
    id: "professionals",
    label: "Working Professionals",
    icon: Briefcase,
    packages: {
      standard: {
        planName: "Ascend Online",
        price: 6499,
        features: [
          { text: "Psychometric assessment to measure interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports with certificate/online courses info", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
      },
      premium: {
        planName: "Ascend Plus+",
        price: 10599,
        isPopular: true,
        features: [
          { text: "Psychometric assessment to measure interests, personality and abilities", included: true },
          { text: "2 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports with certificate/online courses info", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
      },
    },
  },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface PricingCardProps {
  pkg: Package;
  category: string;
  type: "standard" | "premium";
}

function PricingCard({ pkg, category, type }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({
          title: "Error",
          description: "Failed to load payment gateway. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const orderResponse = await apiRequest("POST", "/api/create-order", {
        amount: pkg.price,
        currency: "INR",
        planName: pkg.planName,
        category: category,
      });

      const orderData = await orderResponse.json();

      if (!orderData.order_id) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Path-Finder Career Guidance",
        description: `${pkg.planName} - ${category}`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            const verifyResponse = await apiRequest("POST", "/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast({
                title: "Payment Successful!",
                description: `Thank you for purchasing ${pkg.planName}. We'll contact you shortly.`,
              });
            } else {
              throw new Error("Payment verification failed");
            }
          } catch {
            toast({
              title: "Verification Failed",
              description: "Payment was made but verification failed. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#7C3AED",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={`relative p-6 h-full flex flex-col ${
        pkg.isPopular
          ? "border-primary bg-gradient-to-b from-primary/5 to-background"
          : "bg-card/50"
      }`}
      data-testid={`card-pricing-${type}`}
    >
      {pkg.isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white border-0">
          Most Popular
        </Badge>
      )}

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-muted-foreground mb-1">
          {type === "standard" ? "STANDARD" : "PREMIUM"}
        </h3>
        <div className="text-2xl font-bold text-foreground mb-2">{pkg.planName}</div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            ₹{pkg.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            {feature.included ? (
              <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-green-500" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
            <span
              className={`text-sm ${
                feature.included ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Button
        className={`w-full ${
          pkg.isPopular
            ? "bg-gradient-to-r from-primary to-purple-600 text-white border-0"
            : ""
        }`}
        variant={pkg.isPopular ? "default" : "outline"}
        onClick={handlePayment}
        disabled={isLoading}
        data-testid={`button-buy-${type}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "BUY NOW"
        )}
      </Button>
    </Card>
  );
}

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const currentCategory = categories.find((c) => c.id === activeCategory)!;

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm font-medium text-foreground mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Path to Success
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your career stage and goals. All plans
            include access to our expert career coaches.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`gap-2 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white border-0"
                  : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
              data-testid={`button-category-${category.id}`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PricingCard
              pkg={currentCategory.packages.standard}
              category={currentCategory.label}
              type="standard"
            />
            <PricingCard
              pkg={currentCategory.packages.premium}
              category={currentCategory.label}
              type="premium"
            />
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Secure payments powered by Razorpay. All prices are in Indian Rupees (INR).
        </motion.p>
      </div>
    </section>
  );
}

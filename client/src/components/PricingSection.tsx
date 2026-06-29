import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, GraduationCap, BookOpen, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookingModal from "@/components/BookingModal";
import CustomPlans from "@/components/CustomPlans";
import { formatCurrency } from "@/lib/currency";
import { useCms } from "@/hooks/useCms";

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  planId: string;
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
    id: "8-10",
    label: "8-10 Students",
    icon: BookOpen,
    packages: {
      standard: {
        planId: "pkg-1",
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
        planId: "pkg-2",
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
        planId: "pkg-3",
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
        planId: "pkg-4",
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
    label: "College Students",
    icon: Users,
    packages: {
      standard: {
        planId: "pkg-5",
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
        planId: "pkg-6",
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
    id: "working",
    label: "Working Professionals",
    icon: Briefcase,
    packages: {
      standard: {
        planId: "mp-3",
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
        planId: "mp-2",
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
];

type SelectedPlan = {
  planId: string;
  title: string;
  category: string;
  price: number;
};

interface PricingCardProps {
  pkg: Package;
  category: string;
  type: "standard" | "premium";
  onBuy: (plan: SelectedPlan) => void;
}

function PricingCard({ pkg, category, type, onBuy }: PricingCardProps) {
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
            {formatCurrency(pkg.price)}
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
        onClick={() =>
          onBuy({
            planId: pkg.planId,
            title: pkg.planName,
            category,
            price: pkg.price,
          })
        }
        data-testid={`button-buy-${type}`}
      >
        BUY NOW
      </Button>
    </Card>
  );
}

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const currentCategory = categories.find((c) => c.id === activeCategory)!;
  const { data } = useCms();
  const customPlans = data?.customPlans ?? [];

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
              onBuy={setSelectedPlan}
            />
            <PricingCard
              pkg={currentCategory.packages.premium}
              category={currentCategory.label}
              type="premium"
              onBuy={setSelectedPlan}
            />
          </motion.div>
        </AnimatePresence>

        <CustomPlans
          plans={customPlans}
          onBuyClick={(plan) =>
            setSelectedPlan({
              planId: plan.planId,
              title: plan.title,
              category: "Custom Mentorship",
              price: plan.price,
            })
          }
        />

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

      {selectedPlan && (
        <BookingModal
          open
          onOpenChange={(open) => !open && setSelectedPlan(null)}
          {...selectedPlan}
        />
      )}
    </section>
  );
}

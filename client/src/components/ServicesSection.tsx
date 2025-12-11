import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Compass, 
  Map, 
  FileText, 
  MessageSquare, 
  Crown, 
  Brain,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Service {
  icon: typeof Compass;
  title: string;
  slug: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Compass,
    title: "Career Guidance",
    slug: "career-guidance",
    description: "Personalized career counseling to help you discover your true calling and align your professional goals.",
    features: ["Self-assessment", "Career exploration", "Goal setting"],
  },
  {
    icon: Map,
    title: "Career Path Planning",
    slug: "career-path-planning",
    description: "Strategic roadmaps for your career progression with actionable milestones and timelines.",
    features: ["5-year planning", "Skill gap analysis", "Industry insights"],
  },
  {
    icon: FileText,
    title: "Resume & Profile Building",
    slug: "resume-&-profile-building",
    description: "Create compelling resumes and LinkedIn profiles that stand out to recruiters and hiring managers.",
    features: ["ATS optimization", "LinkedIn makeover", "Portfolio review"],
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    slug: "interview-preparation",
    description: "Mock interviews and coaching to boost your confidence and ace any interview format.",
    features: ["Mock interviews", "Body language", "Salary negotiation"],
  },
  {
    icon: Crown,
    title: "Leadership Coaching",
    slug: "leadership-coaching",
    description: "Develop executive presence and leadership skills to advance into senior roles.",
    features: ["Executive coaching", "Team management", "Strategic thinking"],
  },
  {
    icon: Brain,
    title: "Behavioral Training",
    slug: "behavioral-training",
    description: "Enhance soft skills, emotional intelligence, and workplace effectiveness.",
    features: ["Communication", "Conflict resolution", "Time management"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm font-medium text-foreground mb-4">
            What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Services Tailored for{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Your Success
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive career coaching services designed to help you navigate
            your professional journey with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="h-full p-6 group bg-card/50 backdrop-blur-sm border-border hover:-translate-y-1 transition-transform duration-300"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/service/${service.slug}`}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between group/btn"
                    data-testid={`button-service-learn-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

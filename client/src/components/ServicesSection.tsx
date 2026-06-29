import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Compass,
  Map,
  FileText,
  MessageSquare,
  Crown,
  Brain,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCms } from "@/hooks/useCms";
import { imageUrl } from "@/lib/sanity";

const iconByTitle: Record<string, LucideIcon> = {
  "Career Guidance": Compass,
  "Career Path Planning": Map,
  "Resume & Profile Building": FileText,
  "Interview Preparation": MessageSquare,
  "Leadership Coaching": Crown,
  "Behavioral Training": Brain,
};

const defaultIcons = [Compass, Map, FileText, MessageSquare, Crown, Brain];

export function ServicesSection() {
  const { data } = useCms();
  const services = data?.services ?? [];

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
          {services.map((service, index) => {
            const Icon = iconByTitle[service.title] ?? defaultIcons[index % defaultIcons.length];
            const slug = service.link.replace(/^\/service\//, "");

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="h-full p-0 overflow-hidden group bg-card/50 backdrop-blur-sm border-border hover:-translate-y-1 transition-transform duration-300"
                  data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {service.image && (
                    <img
                      src={imageUrl(service.image, 600)}
                      alt={service.image.alt || service.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Link href={`/service/${slug}`}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between group/btn"
                        data-testid={`button-service-learn-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

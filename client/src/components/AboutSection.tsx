import { motion } from "framer-motion";
import { Shield, Heart, Users, Target, Star, CheckCircle } from "lucide-react";
import heroImage from "@assets/generated_images/professional_career_coach_headshot.png";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: typeof Shield;
}

const timeline: TimelineItem[] = [
  {
    year: "2005-2012",
    title: "Indian Army",
    description: "Served with distinction, developing leadership, discipline, and strategic thinking skills that form the foundation of my coaching approach.",
    icon: Shield,
  },
  {
    year: "2012-2018",
    title: "Learning & Development",
    description: "Transitioned into corporate L&D, designing and delivering training programs for Fortune 500 companies across India.",
    icon: Users,
  },
  {
    year: "2018-Present",
    title: "Career Counselling",
    description: "Founded Path-Finder Career Guidance, helping 500+ professionals transform their careers and achieve their dreams.",
    icon: Target,
  },
];

const values = [
  { icon: Heart, label: "Empathy First", description: "Understanding your unique journey" },
  { icon: Shield, label: "Integrity", description: "Honest, constructive feedback" },
  { icon: Star, label: "Excellence", description: "Committed to your success" },
  { icon: CheckCircle, label: "Results", description: "Proven transformation methods" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm font-medium text-foreground mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Meet{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Mahalakshmi Mahadevan
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey from the Indian Army to becoming a trusted career coach,
            guided by a passion for helping others succeed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mb-8">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-xl"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <img
                src={heroImage}
                alt="Mahalakshmi Mahadevan"
                className="relative rounded-2xl shadow-xl w-full max-w-sm mx-auto lg:mx-0 object-cover"
                data-testid="img-about"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{value.label}</div>
                    <div className="text-xs text-muted-foreground">{value.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">
              My Professional Journey
            </h3>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary/30" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative pl-16 pb-10 last:pb-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div
                    className="absolute left-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="bg-background border border-border rounded-xl p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-foreground mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-foreground italic">
                "My approach is calm, empathetic, and structured. I believe every
                professional has unique strengths waiting to be discovered. My role
                is to help you see your potential and create a roadmap to achieve it."
              </p>
              <div className="mt-4 font-semibold text-foreground">
                — Mahalakshmi Mahadevan
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

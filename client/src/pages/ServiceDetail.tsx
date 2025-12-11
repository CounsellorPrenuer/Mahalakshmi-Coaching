import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Phone, Mail } from "lucide-react";
import { 
  Compass, 
  Map, 
  FileText, 
  MessageSquare, 
  Crown, 
  Brain 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface ServiceData {
  icon: typeof Compass;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  ideal: string[];
}

const servicesData: Record<string, ServiceData> = {
  "career-guidance": {
    icon: Compass,
    title: "Career Guidance",
    tagline: "Discover Your True Calling",
    description: "Personalized career counseling to help you discover your true calling and align your professional goals.",
    longDescription: "Our comprehensive career guidance program helps you understand your strengths, interests, and values to find the perfect career path. Through in-depth assessments and one-on-one consultations, we'll help you make informed decisions about your professional future.",
    features: ["Psychometric assessments", "Interest profiling", "Skills evaluation", "Career mapping", "Goal setting workshops", "Industry insights"],
    benefits: ["Clarity on career direction", "Confidence in decision-making", "Aligned career choices", "Long-term career satisfaction", "Reduced career confusion"],
    process: [
      { step: 1, title: "Initial Assessment", description: "Complete comprehensive assessments to understand your personality, interests, and aptitude." },
      { step: 2, title: "Analysis & Discussion", description: "Review results together and explore suitable career options based on your profile." },
      { step: 3, title: "Action Plan", description: "Develop a personalized roadmap with specific steps to achieve your career goals." },
    ],
    ideal: ["Students confused about career choices", "Professionals seeking career change", "Anyone wanting clarity on career direction"],
  },
  "career-path-planning": {
    icon: Map,
    title: "Career Path Planning",
    tagline: "Chart Your Success Journey",
    description: "Strategic roadmaps for your career progression with actionable milestones and timelines.",
    longDescription: "Transform your career aspirations into reality with our strategic planning service. We create detailed, personalized career roadmaps that outline the exact steps you need to take to reach your professional goals, complete with timelines and milestones.",
    features: ["5-year career planning", "Skill gap analysis", "Industry trend analysis", "Milestone setting", "Progress tracking", "Regular reviews"],
    benefits: ["Clear direction and focus", "Measurable progress", "Strategic career moves", "Competitive advantage", "Faster career growth"],
    process: [
      { step: 1, title: "Vision Setting", description: "Define your long-term career vision and identify your ultimate professional goals." },
      { step: 2, title: "Gap Analysis", description: "Assess current skills and identify what's needed to reach your target position." },
      { step: 3, title: "Roadmap Creation", description: "Build a detailed action plan with timelines, milestones, and resources needed." },
    ],
    ideal: ["Ambitious professionals", "Career changers", "Those seeking structured growth", "Early-career professionals"],
  },
  "resume-&-profile-building": {
    icon: FileText,
    title: "Resume & Profile Building",
    tagline: "Stand Out to Recruiters",
    description: "Create compelling resumes and LinkedIn profiles that stand out to recruiters and hiring managers.",
    longDescription: "Your resume and online presence are your first impression. Our expert team will craft compelling, ATS-optimized resumes and LinkedIn profiles that showcase your unique value proposition and help you stand out in competitive job markets.",
    features: ["ATS-optimized resumes", "LinkedIn profile makeover", "Cover letter writing", "Portfolio review", "Personal branding", "Keyword optimization"],
    benefits: ["Higher interview callbacks", "Professional online presence", "Better job opportunities", "Increased visibility", "Competitive edge"],
    process: [
      { step: 1, title: "Profile Review", description: "Analyze your current resume and online profiles to identify areas for improvement." },
      { step: 2, title: "Content Development", description: "Craft compelling content that highlights your achievements and unique value." },
      { step: 3, title: "Optimization", description: "Optimize for ATS systems and ensure maximum visibility to recruiters." },
    ],
    ideal: ["Job seekers", "Career changers", "Professionals updating profiles", "Fresh graduates"],
  },
  "interview-preparation": {
    icon: MessageSquare,
    title: "Interview Preparation",
    tagline: "Ace Every Interview",
    description: "Mock interviews and coaching to boost your confidence and ace any interview format.",
    longDescription: "Interviews can be nerve-wracking, but with proper preparation, you can walk in with confidence. Our comprehensive interview preparation includes mock interviews, feedback sessions, and coaching on body language, communication, and salary negotiation.",
    features: ["Mock interviews", "Behavioral coaching", "Technical prep", "Body language training", "Salary negotiation", "Company research guidance"],
    benefits: ["Increased confidence", "Better first impressions", "Higher success rate", "Negotiation skills", "Interview mastery"],
    process: [
      { step: 1, title: "Assessment", description: "Evaluate your current interview skills and identify areas for improvement." },
      { step: 2, title: "Mock Sessions", description: "Practice with realistic mock interviews tailored to your target roles." },
      { step: 3, title: "Feedback & Refinement", description: "Receive detailed feedback and coaching to polish your interview skills." },
    ],
    ideal: ["Job seekers", "Those facing interview anxiety", "Career changers", "Anyone preparing for important interviews"],
  },
  "leadership-coaching": {
    icon: Crown,
    title: "Leadership Coaching",
    tagline: "Lead with Excellence",
    description: "Develop executive presence and leadership skills to advance into senior roles.",
    longDescription: "Ready to step into leadership? Our executive coaching program helps you develop the mindset, skills, and presence needed to lead effectively. From strategic thinking to team management, we'll prepare you for senior leadership roles.",
    features: ["Executive presence", "Strategic thinking", "Team management", "Decision making", "Stakeholder management", "Leadership style development"],
    benefits: ["Leadership readiness", "Career advancement", "Team effectiveness", "Strategic vision", "Executive confidence"],
    process: [
      { step: 1, title: "Leadership Assessment", description: "Evaluate your current leadership capabilities and identify growth areas." },
      { step: 2, title: "Skill Development", description: "Work on specific leadership competencies through coaching and exercises." },
      { step: 3, title: "Application", description: "Apply learnings in real scenarios with ongoing guidance and support." },
    ],
    ideal: ["Aspiring leaders", "New managers", "Senior professionals", "Those preparing for leadership roles"],
  },
  "behavioral-training": {
    icon: Brain,
    title: "Behavioral Training",
    tagline: "Master Workplace Success",
    description: "Enhance soft skills, emotional intelligence, and workplace effectiveness.",
    longDescription: "Technical skills get you the job, but soft skills help you succeed and advance. Our behavioral training program focuses on developing essential workplace skills including communication, emotional intelligence, conflict resolution, and time management.",
    features: ["Communication skills", "Emotional intelligence", "Conflict resolution", "Time management", "Presentation skills", "Networking abilities"],
    benefits: ["Better relationships", "Improved productivity", "Career advancement", "Workplace harmony", "Personal growth"],
    process: [
      { step: 1, title: "Skills Assessment", description: "Identify your soft skill strengths and areas needing development." },
      { step: 2, title: "Targeted Training", description: "Participate in focused training sessions on priority skill areas." },
      { step: 3, title: "Practice & Feedback", description: "Apply skills in real scenarios with continuous feedback and improvement." },
    ],
    ideal: ["All professionals", "Those facing workplace challenges", "Anyone seeking personal growth", "Team members and managers"],
  },
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceKey = params.service as string;
  const service = servicesData[serviceKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceKey]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link href="/">
            <Button data-testid="button-back-home">Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const scrollToPricing = () => {
    window.location.href = "/#pricing";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/#services">
              <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back-services">
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Button>
            </Link>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-6"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <service.icon className="w-10 h-10 text-white" />
                </motion.div>
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm font-medium text-foreground mb-4">
                  {service.tagline}
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  {service.longDescription}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-purple-600 text-white border-0"
                    onClick={scrollToPricing}
                    data-testid="button-get-started"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <a href="https://wa.me/918861303243" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" data-testid="button-whatsapp-inquiry">
                      <Phone className="mr-2 w-4 h-4" />
                      Quick Inquiry
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Benefits</h2>
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5">
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured approach to help you achieve your goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full relative overflow-visible">
                  <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Ideal For</h2>
            <div className="flex flex-wrap gap-3">
              {service.ideal.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-primary/10 text-foreground text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step towards transforming your career today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 text-white border-0"
                onClick={scrollToPricing}
                data-testid="button-view-pricing"
              >
                View Pricing Plans
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <a href="mailto:careercoachmahalakshmi@gmail.com">
                <Button size="lg" variant="outline" data-testid="button-email-inquiry">
                  <Mail className="mr-2 w-4 h-4" />
                  Email Inquiry
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

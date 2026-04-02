import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying Eatly on your next dinner out.",
    features: [
      "5 menu scans per month",
      "Basic dish explanations",
      "Veg / Non-veg detection",
      "Community support",
    ],
    cta: "Start Free",
    link: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For frequent diners and health-conscious travelers.",
    features: [
      "Unlimited menu scans",
      "Advanced health insights",
      "Detailed nutrition breakdown",
      "Priority AI processing",
      "Language translation (50+)",
      "Ad-free experience",
    ],
    cta: "Upgrade to Pro",
    link: "/signup",
    highlighted: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const PricingSection = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
  <section id="pricing" className="section-padding bg-background">
    <div className="container-max">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeader
            title="Simple, Transparent Pricing"
            subtitle="Start free. Upgrade when you're ready for unlimited smart dining."
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
        >
          {plans.map((p) => (
            <motion.div
              key={p.name}
              variants={itemVariants}
              className={`rounded-xl border p-6 md:p-8 space-y-6 transition-all duration-200 ${
                p.highlighted
                  ? "border-primary bg-primary/[0.02] shadow-md ring-1 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {p.name}
                  </h3>
                  {p.highlighted && <Badge variant="default">Popular</Badge>}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {p.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {p.period}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{p.description}</p>
              </div>

              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={p.highlighted ? "hero" : "hero-outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <Link
                  to={
                    isAuthenticated
                      ? p.name === "Pro"
                        ? "/upgrade"
                        : "/dashboard"
                      : p.link
                  }
                >
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

export default PricingSection;

import { useState } from "react";
import {
  Check,
  ScanLine,
  UtensilsCrossed,
  HeartPulse,
  Star,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "scan",
    label: "Menu Scan",
    icon: ScanLine,
    title: "Instant Menu Scanning (OCR)",
    description:
      "Point your camera at any menu — printed, handwritten, or digital. Our OCR engine extracts every dish name, description, and price in seconds.",
    bullets: [
      "Works with 50+ languages",
      "Handles handwritten & printed menus",
      "Extracts prices and descriptions",
      "Processes in under 3 seconds",
    ],
  },
  {
    id: "breakdown",
    label: "Dish Breakdown",
    icon: UtensilsCrossed,
    title: "Plain-English Dish Explanations",
    description:
      "No more Googling unfamiliar dishes. Eatly explains every item in simple, clear language — including key ingredients and preparation style.",
    bullets: [
      "Simple English explanations",
      "Key ingredient highlights",
      "Allergen warnings",
      "Cooking method details",
    ],
  },
  {
    id: "health",
    label: "Health Rating",
    icon: HeartPulse,
    title: "Smart Health Scoring",
    description:
      "Each dish gets a Healthy, Moderate, or Avoid label based on nutritional analysis. See exactly why a dish got its rating.",
    bullets: [
      "Three-tier health rating system",
      "Calorie & macro estimates",
      "Detailed reasoning for each rating",
      "Dietary restriction alerts",
    ],
  },
  {
    id: "picks",
    label: "Top Picks",
    icon: Star,
    title: "Personalized Recommendations",
    description:
      "Get AI-curated top picks tailored to your dietary preferences, health goals, and taste profile.",
    bullets: [
      "Top 3 healthiest options highlighted",
      "Matches your dietary preferences",
      "Considers your past favorites",
      "Cuisine-specific recommendations",
    ],
  },
  {
    id: "pro",
    label: "Pro Features",
    icon: Zap,
    title: "Advanced Pro Features",
    description:
      "Unlock premium features including meal planning integration, nutrition tracking, and unlimited scans with priority AI processing.",
    bullets: [
      "Unlimited daily scans",
      "Detailed nutrition breakdown",
      "Save & share meal plans",
      "Priority AI processing",
    ],
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const FeaturesSection = () => {
  const [active, setActive] = useState("scan");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-max">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="text-sm font-medium text-primary uppercase tracking-wider block"
          >
            Features
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold text-foreground mt-3"
          >
            Everything You Need to Eat Smart
          </motion.h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {tabs.map((t) => (
            <motion.button
              key={t.id}
              onClick={() => setActive(t.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                active === t.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-transparent hover:border-border hover:bg-secondary/10"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  {current.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {current.description}
                </p>
                <ul className="space-y-3">
                  {current.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/50 rounded-2xl p-8 flex items-center justify-center min-h-[320px] border border-border/50">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary shadow-sm">
                    <current.icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">
                    {current.title}
                  </h4>
                  <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                    {current.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

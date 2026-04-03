import { ScanLine, Sparkles, HeartPulse } from "lucide-react";
import howItWorksImg from "@/assets/how-it-works.jpg";
import { motion } from "framer-motion";

const steps = [
  {
    icon: ScanLine,
    number: "01",
    title: "Upload or Scan Menu",
    desc: "Take a photo or upload a menu image — any language, any format.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "AI Extracts & Analyzes",
    desc: "Our AI reads every dish, explains ingredients, and identifies dietary info.",
  },
  {
    icon: HeartPulse,
    number: "03",
    title: "Get Ratings & Picks",
    desc: "See health scores and get smart recommendations for the best choices.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,  
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, 
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HowItWorksSection = () => (
  <section id="how-it-works" className="section-padding bg-muted">
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
          How It Works
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4"
        >
          From Menu to Smart Recommendation in Seconds
        </motion.h2>
      </motion.div>

      {/* Steps */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {steps.map((s) => (
          <motion.div
            key={s.number}
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary">
              <s.icon className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-primary uppercase tracking-wider">
              Step {s.number}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Visual */}
      <motion.div
        className="rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <img
          src={howItWorksImg}
          alt="Eatly workflow: scan, analyze, recommend"
          className="w-full"
          loading="lazy"
        />
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;

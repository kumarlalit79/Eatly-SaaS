import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, HeartPulse, Sparkles } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";
import appMockup from "@/assets/app-mockup.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HeroSection = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
  <section className="relative overflow-hidden">
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <img src={heroFood} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
    </div>

    <div className="relative container-max section-padding">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          className="space-y-6 max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="veg" className="gap-1.5">
              <Sparkles className="w-3 h-3" />
              AI-Powered Menu Intelligence
            </Badge>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.1] text-foreground"
            variants={itemVariants}
          >
            Never Be Confused by a Menu Again.
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            variants={itemVariants}
          >
            Scan any restaurant menu and instantly get dish explanations,
            veg/non-veg labels, health ratings, and smart recommendations — all
            powered by AI.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            variants={itemVariants}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                Scan a Menu <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right mockup */}
        <div className="hidden lg:flex justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={appMockup}
              alt="Eatly app showing dish health ratings"
              className="w-[320px] rounded-3xl shadow-2xl"
            />
            {/* Floating badges */}
            <motion.div
              className="absolute -left-12 top-1/4 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Leaf className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-foreground">
                Masala Dosa
              </span>
              <Badge variant="veg">Veg</Badge>
            </motion.div>
            <motion.div
              className="absolute -right-8 top-1/2 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <HeartPulse className="w-4 h-4 text-success" />
              <Badge variant="healthy">Healthy</Badge>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;

import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { motion } from "framer-motion";
import { Camera, Heart, Sparkles, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Particles */}
      <Particles
        className="absolute inset-0 z-0 opacity-40"
        quantity={100}
        color="#0F766E"
        refresh
      />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to Eatly{" "}
              <span className="animate-wave inline-block">👋</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Scan a menu and we’ll instantly tell you what’s healthy and what
              to avoid.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 py-8">
            {[
              { icon: Camera, label: "Upload menu photo", delay: 0.3 },
              { icon: Heart, label: "Get health ratings", delay: 0.4 },
              { icon: Sparkles, label: "Find best dishes", delay: 0.5 },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.delay }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-xl flex flex-col items-center gap-3 hover:bg-card/80 transition-colors"
              >
                <div className="p-3 bg-background rounded-full shadow-sm">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium text-foreground">
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all"
              asChild
            >
              {/* Link to a dummy dashboard or upload route for now */}
              <Link to="/dashboard">
                <Upload className="w-5 h-5 mr-2" />
                Upload Your First Menu
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Takes less than 30 seconds
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;

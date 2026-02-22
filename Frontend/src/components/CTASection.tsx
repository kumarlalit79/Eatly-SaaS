import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

const CTASection = () => (
  <section className="section-padding bg-primary overflow-hidden">
    <div className="container-max">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="space-y-4 text-center lg:text-left max-w-xl">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold text-primary-foreground leading-tight"
          >
            Ready to Make Smarter Food Choices?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-primary-foreground/80 text-lg leading-relaxed"
          >
            Join thousands of diners who eat healthier, discover new cuisines,
            and never feel lost reading a menu again.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              variant="outline"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none rounded-pill font-semibold"
            >
              Start Scanning Now <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="text-primary-foreground/20"
        >
          <ArrowRight className="w-32 h-32 lg:w-40 lg:h-40" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;

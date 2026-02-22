import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How accurate is it?",
    a: "Eatly uses advanced AI to ensure high accuracy. For tricky handwriting, you can manually correct it or provide feedback to improve results.",
  },
  {
    q: "Does it work in India?",
    a: "Yes! Eatly works globally and specifically supports local Indian cuisines, regional languages, and diverse menu formats found across India.",
  },
  {
    q: "Can I scan any language menu?",
    a: "Absolutely. Eatly supports over 50 languages and can translate them instantly for you, making it perfect for international travel.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your Pro subscription at any time with no hidden fees or lock-in periods.",
  },
  {
    q: "Is my data private?",
    a: "Yes, we take data privacy seriously. Your menu scans and personal information are encrypted and never shared with third parties without your consent.",
  },
  {
    q: "Do you offer diet recommendations?",
    a: "Eatly highlights dishes based on your preferences (Veg/Non-Veg) and health goals, helping you make informed choices every time you eat out.",
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

const FAQSection = () => (
  <section id="faq" className="section-padding bg-muted">
    <div className="container-max">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Eatly."
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-x-8 gap-y-0 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {[faqs.slice(0, 3), faqs.slice(3)].map((col, ci) => (
            <motion.div key={ci} variants={itemVariants} className="w-full">
              <Accordion type="single" collapsible className="w-full">
                {col.map((f, i) => (
                  <AccordionItem key={i} value={`${ci}-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:text-primary">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;

import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import benefitScan from "@/assets/benefit-scan.jpg";
import benefitVeg from "@/assets/benefit-veg.jpg";
import benefitHealth from "@/assets/benefit-health.jpg";

const benefits = [
  {
    image: benefitScan,
    title: "AI Dish Explanation",
    description: "Confused by 'Bibimbap' or 'Khao Soi'? Eatly explains any dish in simple, clear English so you know exactly what you're ordering.",
  },
  {
    image: benefitVeg,
    title: "Veg / Non-Veg Detection",
    description: "Instantly see clear veg and non-veg labels with color-coded tags — no more guessing or asking the waiter.",
  },
  {
    image: benefitHealth,
    title: "Smart Health Scoring",
    description: "Every dish gets a Healthy, Moderate, or Avoid rating with reasons — so you can eat well without overthinking.",
  },
];

const BenefitsSection = () => (
  <section className="section-padding bg-background mt-[100px]">
    <div className="container-max">
      <SectionHeader
        title="Why Eatly?"
        subtitle="Traveling abroad? Watching your diet? Trying something new? Eatly makes every menu decision effortless."
      />

      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group bg-card rounded-xl border border-border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5 md:p-6 space-y-3">
              <h3 className="text-xl font-semibold text-foreground">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              <Button variant="link" className="px-0 text-primary">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;

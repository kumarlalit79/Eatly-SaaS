import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DashboardSection from "@/components/DashboardSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal>
        <DashboardSection />
      </ScrollReveal>
      <ScrollReveal>
        <BenefitsSection />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorksSection />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal>
        <PricingSection />
      </ScrollReveal>
      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </main>
    <Footer />
  </div>
);

export default Index;

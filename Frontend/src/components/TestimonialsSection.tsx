import SectionHeader from "@/components/SectionHeader";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import {
  TestimonialsColumn,
  Testimonial,
} from "@/components/ui/testimonials-columns-1";

// Existing testimonials + new ones to fill columns
const testimonialsData: Testimonial[] = [
  {
    image: avatar1,
    name: "Priya Sharma",
    role: "Food Blogger",
    text: "I was traveling in Japan and couldn't read any menu. Eatly scanned everything and told me exactly what was in each dish — I avoided allergens I didn't even know were there!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    name: "David Chen",
    role: "Frequent Traveler",
    text: "The AI explanations are spot-on. It's not just translation; it describes the taste and texture. Like having a local guide in your pocket.",
  },
  {
    image: avatar2,
    name: "James Wilson",
    role: "Health Enthusiast",
    text: "As someone watching my cholesterol, Eatly's health ratings are a game-changer. I finally eat out without guilt or guesswork. The 'Avoid' warnings have saved me so many times.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    name: "Sarah Jenkins",
    role: "Vegan Diner",
    text: "Finally, I can be 100% sure a dish is vegan. No more awkward questions to the waiter. Eatly highlights hidden ingredients instantly.",
  },
  {
    image: avatar3,
    name: "Kristie Wajema",
    role: "Vegetarian",
    text: "I'm vegetarian and dining abroad used to be stressful. Eatly's veg/non-veg detection is incredibly accurate. It's like having a food-savvy friend with you at every restaurant.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    name: "Michael Ross",
    role: "Foodie",
    text: "I love discovering new dishes. Eatly recommends hidden gems on the menu based on my preferences. It's revolutionized how I order.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    name: "Emma Davis",
    role: "Nutritionist",
    text: "I recommend Eatly to all my clients. The macro breakdown and health score help them stay on track even when dining out socially.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    name: "Alex Thompson",
    role: "Tech Professional",
    text: "The speed is incredible. Scan, analyze, decide. It makes ordering lunch for the whole office so much easier and safer.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    name: "Lisa Wong",
    role: "Travel Vlogger",
    text: "My audience loves when I use Eatly. It helps me explain exotic dishes to them properly. A must-have app for any food traveler.",
  },
];

const TestimonialsSection = () => {
  const column1 = testimonialsData.slice(0, 3);
  const column2 = testimonialsData.slice(3, 6);
  const column3 = testimonialsData.slice(6, 9);

  return (
    <section className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-max">
        <SectionHeader
          title="What Our Users Are Saying"
          subtitle="Thousands of travelers, health-conscious diners, and foodies trust Eatly every day."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 h-[600px] overflow-hidden relative mask-gradient">
          <TestimonialsColumn testimonials={column1} duration={25} />
          <TestimonialsColumn
            testimonials={column2}
            duration={30}
            className="hidden md:flex"
          />
          <TestimonialsColumn
            testimonials={column3}
            duration={28}
            className="hidden lg:flex"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

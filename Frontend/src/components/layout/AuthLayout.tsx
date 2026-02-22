import { ReactNode } from "react";
import { Particles } from "@/components/ui/particles";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  subtitle?: string;
  title?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col relative bg-muted/30 p-12 overflow-hidden text-foreground">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2574&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/20" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </div>

        <Particles
          className="absolute inset-0 z-0 opacity-50"
          quantity={80}
          color="#0F766E"
          refresh
        />

        <div className="relative z-10 flex items-center gap-2 mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
            </span>
            Eatly
          </Link>
        </div>

        <div className="relative z-10 mt-auto">
          <h1 className="text-4xl font-bold mb-4">Join the food revolution</h1>
          <p className="text-lg text-muted-foreground/90 leading-relaxed max-w-md">
            "Eatly transformed how I understand food. It's like having a
            nutritionist in my pocket everywhere I go."
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://randomuser.me/api/portraits/women/${i + 20}.jpg`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">Joined by 10,000+ foodies</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative bg-background">
        <Link
          to="/"
          className="absolute top-8 left-8 lg:hidden flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

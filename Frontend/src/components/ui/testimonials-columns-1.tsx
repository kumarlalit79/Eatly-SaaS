"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role?: string;
}

export const TestimonialsColumn = ({
  testimonials,
  className,
  duration = 10,
}: {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
}) => {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden h-[600px] relative",
        className,
      )}
    >
      <motion.div
        animate={{
          y: ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {testimonial.name}
                </p>
                {testimonial.role && (
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};

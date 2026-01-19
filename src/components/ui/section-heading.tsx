"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("max-w-2xl mb-12", alignClass[align], className)}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 rounded-full">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-[#1E3A5F]/70 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

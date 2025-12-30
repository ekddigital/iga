"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -8, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-[#F5F5F5] transition-all hover:shadow-xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GradientBorderCard({
  children,
  className,
  delay = 0,
}: GradientBorderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F1C40F] p-[2px]",
        className
      )}
    >
      <div className="relative rounded-2xl bg-white p-6 h-full">{children}</div>
    </motion.div>
  );
}

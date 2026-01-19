"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "navy" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function GlowButton({
  children,
  className,
  variant = "gold",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
}: GlowButtonProps) {
  const variants = {
    gold: "bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] text-[#0A2540] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
    navy: "bg-gradient-to-r from-[#0A2540] to-[#1E3A5F] text-white hover:shadow-[0_0_30px_rgba(10,37,64,0.4)]",
    outline:
      "bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2540]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

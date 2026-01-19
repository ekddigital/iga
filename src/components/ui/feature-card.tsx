"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  className,
  delay = 0,
}: FeatureCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg border border-[#F5F5F5] transition-all hover:shadow-xl hover:border-[#D4AF37]/30",
        className
      )}
    >
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#F1C40F]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#F1C40F]/5 transition-all duration-300" />

      {/* Icon */}
      <div className="relative mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] text-white shadow-md">
        <Icon className="h-7 w-7" />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#0A2540] transition-colors">
          {title}
        </h3>
        <p className="text-[#1E3A5F]/70 leading-relaxed">{description}</p>

        {href && (
          <div className="mt-4 flex items-center gap-2 text-[#D4AF37] font-semibold">
            Learn More
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

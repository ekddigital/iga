"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";

import { Container } from "@/components/layout";
import { GlowButton } from "@/components/ui/glow-button";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F5F5]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2540] via-[#1E3A5F] to-[#0A2540] p-10 lg:p-16 text-center"
        >
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F1C40F]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
              </span>
              <span className="text-sm text-[#D4AF37] font-medium">
                Limited Slots Available
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1C40F]">
                Global Journey?
              </span>
            </h2>

            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Book a consultation today and discover how we can help you achieve
              your goals in education, career, travel, or business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <GlowButton
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
              <Link href="/contact">
                <GlowButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-[#0A2540]"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Send a Message
                </GlowButton>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10 pt-8 border-t border-white/10"
            >
              <p className="text-white/50 text-sm mb-4">
                Trusted by clients from
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  "Nigeria",
                  "Kenya",
                  "Ghana",
                  "South Africa",
                  "Ethiopia",
                  "China",
                ].map((country) => (
                  <span
                    key={country}
                    className="text-white/60 text-sm font-medium"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

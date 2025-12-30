"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles } from "lucide-react";

import { Container } from "@/components/layout";
import { GlowButton } from "@/components/ui/glow-button";
import { FloatingElement, GradientText } from "@/components/ui/effects";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#1E3A5F] to-[#0A2540]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F1C40F]/10 rounded-full blur-3xl" />

        {/* Floating Icons */}
        <FloatingElement
          className="absolute top-20 left-[15%] hidden lg:block"
          delay={0}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Globe className="w-8 h-8 text-[#D4AF37]" />
          </div>
        </FloatingElement>
        <FloatingElement
          className="absolute bottom-32 right-[10%] hidden lg:block"
          delay={1}
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-[#F1C40F]" />
          </div>
        </FloatingElement>
      </div>

      <Container className="relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-white/90 font-medium">
                Connecting Continents, Creating Opportunities
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Bridging{" "}
              <GradientText from="#D4AF37" to="#F1C40F">
                Africa
              </GradientText>{" "}
              &{" "}
              <GradientText from="#F1C40F" to="#D4AF37">
                China
              </GradientText>{" "}
              for Global Success
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              Your trusted partner for cross-border opportunities. We facilitate
              education, employment, travel, and trade between Africa and China
              with expert guidance and personalized solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <GlowButton
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
              <Link href="/services">
                <GlowButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-[#0A2540]"
                >
                  Explore Services
                </GlowButton>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center gap-8"
            >
              <div>
                <p className="text-3xl font-bold text-[#D4AF37]">500+</p>
                <p className="text-sm text-white/60">Clients Served</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-[#D4AF37]">15+</p>
                <p className="text-sm text-white/60">Partner Institutions</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-[#D4AF37]">98%</p>
                <p className="text-sm text-white/60">Success Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Logo/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[400px] h-[400px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/30 to-[#F1C40F]/30 rounded-full blur-3xl" />

              {/* Logo Container */}
              <div className="relative w-full h-full rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Inspire Global Access"
                  width={280}
                  height={280}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4"
              >
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#F1C40F] shadow-lg shadow-[#F1C40F]/50" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

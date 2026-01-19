"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  HeartHandshake,
  Languages,
  TrendingUp,
  Headphones,
} from "lucide-react";

import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    description:
      "Years of experience navigating China-Africa relations with proven results",
  },
  {
    icon: Clock,
    title: "Time-Saving Solutions",
    description:
      "Streamlined processes that save you weeks of research and paperwork",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Approach",
    description:
      "Tailored solutions that match your unique goals and circumstances",
  },
  {
    icon: Languages,
    title: "Bilingual Support",
    description: "Fluent in English, Chinese, and major African languages",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "98% client success rate with hundreds of success stories",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "Continuous guidance from consultation to achievement",
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <SectionHeading
              subtitle="Why Choose Us"
              title="Your Bridge to Success"
              description="We combine deep local knowledge with international expertise to deliver exceptional results for our clients."
              align="left"
            />

            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <reason.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A2540] mb-1">
                      {reason.title}
                    </h4>
                    <p className="text-sm text-[#1E3A5F]/70">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A2540] to-[#1E3A5F]">
              {/* Decorative Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-8 left-8 w-20 h-20 border-2 border-[#D4AF37]/30 rounded-full" />
                <div className="absolute bottom-12 right-12 w-32 h-32 border-2 border-[#F1C40F]/20 rounded-full" />
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-[#D4AF37] rounded-full" />
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#F1C40F] rounded-full" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-[#D4AF37] text-[#0A2540] font-semibold rounded-full text-sm">
                      Established 2024
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Building Bridges
                    <br />
                    Across Continents
                  </h3>
                  <p className="text-white/70 max-w-xs mx-auto">
                    From Beijing to Lagos, from education to trade — we're your
                    trusted partner in every step.
                  </p>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A2540] to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-[#0A2540]">98%</span>
              </div>
              <p className="text-sm text-[#1E3A5F]/70">Client Success Rate</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

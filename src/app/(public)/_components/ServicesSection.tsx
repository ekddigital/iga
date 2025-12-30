"use client";

import { GraduationCap, Briefcase, Plane, Building2 } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { SERVICES } from "@/constants";

const iconMap = {
  GraduationCap,
  Briefcase,
  Plane,
  Building2,
};

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeading
          subtitle="What We Offer"
          title="Comprehensive Advisory Services"
          description="From education to trade, we provide end-to-end solutions for your cross-border journey between Africa and China."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <FeatureCard
                key={service.id}
                title={service.title}
                description={service.shortDesc}
                icon={Icon}
                href={service.href}
                delay={index * 0.1}
              />
            );
          })}
        </div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#0A2540] to-[#1E3A5F] text-white"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consult",
                desc: "Book a personalized consultation",
              },
              {
                step: "02",
                title: "Plan",
                desc: "We create a tailored roadmap",
              },
              {
                step: "03",
                title: "Execute",
                desc: "Implementation with full support",
              },
              {
                step: "04",
                title: "Succeed",
                desc: "Achieve your global goals",
              },
            ].map((item, index) => (
              <div key={item.step} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37] text-[#0A2540] font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

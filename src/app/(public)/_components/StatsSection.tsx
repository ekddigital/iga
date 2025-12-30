"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building, Globe2, Award } from "lucide-react";

import { Container } from "@/components/layout";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Clients Served",
    description: "Individuals and businesses guided",
  },
  {
    icon: Building,
    value: 15,
    suffix: "+",
    label: "Partner Institutions",
    description: "Universities and companies",
  },
  {
    icon: Globe2,
    value: 20,
    suffix: "+",
    label: "Countries Covered",
    description: "Across Africa and China",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Client satisfaction score",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] text-white mb-4">
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-4xl font-bold text-[#0A2540] mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <h3 className="text-lg font-semibold text-[#0A2540] mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-[#1E3A5F]/60">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

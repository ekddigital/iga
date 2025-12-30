"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { NAV_LINKS, SERVICES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isServices = link.href === "/services";

              if (isServices) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                        isActive
                          ? "text-[#D4AF37]"
                          : "text-[#0A2540] hover:text-[#D4AF37] hover:bg-[#F5F5F5]"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isServicesOpen && "rotate-180"
                        )}
                      />
                    </Link>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-2"
                        >
                          <div className="w-64 rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/5">
                            {SERVICES.map((service) => (
                              <Link
                                key={service.id}
                                href={service.href}
                                className="block rounded-md px-3 py-2 text-sm text-[#0A2540] hover:bg-[#F5F5F5] hover:text-[#D4AF37] transition-colors"
                              >
                                <span className="font-medium">
                                  {service.title}
                                </span>
                                <p className="text-xs text-[#1E3A5F]/70 mt-0.5">
                                  {service.shortDesc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive
                      ? "text-[#D4AF37]"
                      : "text-[#0A2540] hover:text-[#D4AF37] hover:bg-[#F5F5F5]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] text-[#0A2540] font-semibold hover:opacity-90 shadow-md"
            >
              <Link href="/book">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-[#0A2540]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Logo showText={false} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    className="text-[#0A2540]"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "px-4 py-3 text-base font-medium transition-colors rounded-md",
                            isActive
                              ? "bg-[#0A2540] text-white"
                              : "text-[#0A2540] hover:bg-[#F5F5F5]"
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Services Submenu */}
                  <div className="mt-6">
                    <p className="px-4 text-xs font-semibold uppercase tracking-wider text-[#1E3A5F]/60">
                      Our Services
                    </p>
                    <div className="mt-2 flex flex-col gap-1">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          href={service.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-4 py-2 text-sm text-[#0A2540] hover:bg-[#F5F5F5] rounded-md"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>

                <div className="p-4 border-t">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] text-[#0A2540] font-semibold"
                  >
                    <Link href="/book" onClick={() => setMobileOpen(false)}>
                      Book Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </Container>
    </header>
  );
}

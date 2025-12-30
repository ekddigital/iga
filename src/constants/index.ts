// Navigation Links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// Service Categories
export const SERVICES = [
  {
    id: "education",
    title: "Education Advisory",
    shortDesc:
      "Connect African students with Chinese universities and scholarship programs",
    icon: "GraduationCap",
    href: "/services/education",
  },
  {
    id: "employment",
    title: "Employment Facilitation",
    shortDesc:
      "Bridge talent gaps between Chinese companies and African professionals",
    icon: "Briefcase",
    href: "/services/employment",
  },
  {
    id: "travel",
    title: "Travel & Visa Services",
    shortDesc: "Comprehensive visa assistance and travel planning services",
    icon: "Plane",
    href: "/services/travel",
  },
  {
    id: "trade",
    title: "Trade Consulting",
    shortDesc:
      "Facilitate import/export opportunities and business partnerships",
    icon: "Building2",
    href: "/services/trade",
  },
] as const;

// Partnership Types
export const PARTNERSHIP_TYPES = [
  { id: "university", label: "University/Institution" },
  { id: "company", label: "Company/Corporation" },
  { id: "government", label: "Government Agency" },
  { id: "ngo", label: "NGO/Non-profit" },
  { id: "other", label: "Other" },
] as const;

// Countries (Africa focus + China)
export const COUNTRIES = [
  { code: "CN", name: "China" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "GH", name: "Ghana" },
  { code: "ET", name: "Ethiopia" },
  { code: "TZ", name: "Tanzania" },
  { code: "UG", name: "Uganda" },
  { code: "EG", name: "Egypt" },
  { code: "RW", name: "Rwanda" },
  { code: "SN", name: "Senegal" },
  { code: "CM", name: "Cameroon" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "MA", name: "Morocco" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "MZ", name: "Mozambique" },
  { code: "AO", name: "Angola" },
  { code: "CD", name: "DR Congo" },
  { code: "OTHER", name: "Other" },
] as const;

// Booking Types with descriptions
export const BOOKING_TYPES = [
  {
    type: "EDUCATION",
    label: "Education Consultation",
    price: 50,
    duration: "45 min",
    description:
      "Discuss university options, scholarships, and application process",
  },
  {
    type: "EMPLOYMENT",
    label: "Career Consultation",
    price: 75,
    duration: "60 min",
    description: "Career guidance, job matching, and visa requirements",
  },
  {
    type: "TRAVEL",
    label: "Travel & Visa Consultation",
    price: 50,
    duration: "30 min",
    description: "Visa requirements, travel planning, and documentation",
  },
  {
    type: "TRADE",
    label: "Trade & Business Consultation",
    price: 100,
    duration: "60 min",
    description: "Import/export guidance, business partnerships, regulations",
  },
  {
    type: "PARTNERSHIP",
    label: "Partnership Discussion",
    price: 150,
    duration: "90 min",
    description: "Strategic partnership opportunities and collaborations",
  },
] as const;

// Social Links
export const SOCIAL_LINKS = [
  {
    platform: "twitter",
    url: "https://twitter.com/inspireglobalaccess",
    icon: "Twitter",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/company/inspireglobalaccess",
    icon: "Linkedin",
  },
  {
    platform: "facebook",
    url: "https://facebook.com/inspireglobalaccess",
    icon: "Facebook",
  },
  {
    platform: "instagram",
    url: "https://instagram.com/inspireglobalaccess",
    icon: "Instagram",
  },
] as const;

// Company Info
export const COMPANY = {
  name: "Inspire Global Access",
  shortName: "IGA",
  tagline: "Bridging Africa and China for Global Success",
  email: "info@inspireglobalaccess.com",
  phone: "+86 123 456 7890",
  address: "Beijing, China",
  founded: 2024,
} as const;

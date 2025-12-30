// IGA Brand Colors
export const COLORS = {
  // Primary - Deep Navy to Navy Blue
  primary: {
    DEFAULT: "#0A2540", // IGA Deep Navy - main brand color
    light: "#1E3A5F", // IGA Navy Blue - secondary
    50: "#e6eaf0",
    100: "#c0cad8",
    200: "#9aaabf",
    300: "#748aa6",
    400: "#4e6a8d",
    500: "#2d4f73",
    600: "#1E3A5F", // IGA Navy Blue
    700: "#152d4a",
    800: "#0A2540", // IGA Deep Navy
    900: "#081c32",
    950: "#051220",
  },
  // Secondary - White
  secondary: {
    DEFAULT: "#FFFFFF",
    muted: "#F5F5F5", // Light Gray for backgrounds
  },
  // Accent - Gold
  accent: {
    DEFAULT: "#D4AF37", // IGA Gold
    light: "#F1C40F", // IGA Bright Gold
    dark: "#b8941e",
    50: "#fcf8e8",
    100: "#f7edc5",
    200: "#f1e19d",
    300: "#ebd375",
    400: "#F1C40F", // IGA Bright Gold
    500: "#D4AF37", // IGA Gold
    600: "#b8941e",
    700: "#9a7a18",
    800: "#7c6113",
    900: "#5e490e",
  },
  // Neutral
  neutral: {
    50: "#fafafa",
    100: "#F5F5F5", // Light Gray
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#0A2540", // Use Deep Navy for dark text
    950: "#081c32",
  },
} as const;

// Gradient Definitions
export const GRADIENTS = {
  navy: "linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)",
  gold: "linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)",
  navyToGold: "linear-gradient(135deg, #0A2540 0%, #D4AF37 100%)",
  hero: "linear-gradient(180deg, #0A2540 0%, #1E3A5F 50%, #0A2540 100%)",
} as const;

// Site Configuration
export const SITE_CONFIG = {
  name: "Inspire Global Access",
  description:
    "Bridging Africa and China for global success through education, employment, travel, and trade services.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://inspireglobalaccess.com",
  ogImage: "/og-image.jpg",
  locale: "en_US",
} as const;

// SEO Defaults
export const SEO_DEFAULTS = {
  titleTemplate: "%s | Inspire Global Access",
  defaultTitle: "Inspire Global Access - China-Africa Advisory Services",
  description: SITE_CONFIG.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    cardType: "summary_large_image",
    handle: "@inspireglobalaccess",
  },
} as const;

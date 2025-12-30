import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export function Logo({
  className,
  width = 48,
  height = 48,
  showText = true,
}: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo.png"
        alt="Inspire Global Access"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-[#0A2540] leading-tight">
            Inspire Global Access
          </span>
          <span className="text-xs text-[#1E3A5F] hidden sm:block">
            Bridging Africa & China
          </span>
        </div>
      )}
    </Link>
  );
}

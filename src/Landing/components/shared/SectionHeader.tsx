"use client";

import StaggerWords from "@/components/motion/StaggerWords";
import AccentLine from "@/components/motion/AccentLine";
import FadeIn from "@/components/motion/FadeIn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  highlight,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-14 ${className}`}>
      <StaggerWords
        text={title}
        highlight={highlight}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
      />
      <AccentLine />
      {subtitle && (
        <FadeIn delay={0.3}>
          <p className="mt-4 text-text-secondary text-base max-w-lg mx-auto">
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

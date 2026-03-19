"use client";

import { motion, type Variants } from "framer-motion";

interface StaggerWordsProps {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "p";
  highlight?: string;
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function StaggerWords({
  text,
  className,
  as: Tag = "h2",
  highlight,
}: StaggerWordsProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="inline"
      >
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            variants={word}
            className={`inline-block mr-[0.25em] ${
              highlight && w.toLowerCase().includes(highlight.toLowerCase())
                ? "text-accent"
                : "text-white"
            }`}
          >
            {w}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

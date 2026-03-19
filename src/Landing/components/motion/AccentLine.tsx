"use client";

import { motion } from "framer-motion";

interface AccentLineProps {
  className?: string;
}

export default function AccentLine({ className = "" }: AccentLineProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className={`h-1 w-12 bg-accent origin-left rounded-full mx-auto mt-4 ${className}`}
    />
  );
}

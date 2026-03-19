"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type AnimatedButtonProps = HTMLMotionProps<"a">;

export default function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

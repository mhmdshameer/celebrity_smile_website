import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealTag = "div" | "section" | "li" | "article";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
}

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Fades, lifts and un-blurs its content the first time it scrolls into view. */
export const Reveal = ({ children, delay = 0, className, as = "div" }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
};

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

type RevealTag = "div" | "section" | "li" | "article";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
  /** false keeps the content fully visible and only lifts it (for a page's main heading) */
  fade?: boolean;
  /** false skips the blur, which is costly on long grids */
  blur?: boolean;
}

const EASE = [0.2, 0.7, 0.2, 1] as const;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const usePrefersReducedMotion = () => {
  const [reduce, setReduce] = useState(prefersReducedMotion);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduce(query.matches);
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
};

// Animating needs IntersectionObserver and a visible page; otherwise the content would sit invisible
const canAnimateOnMount = () =>
  typeof window !== "undefined" &&
  typeof window.IntersectionObserver !== "undefined" &&
  document.visibilityState !== "hidden";

/** Fades, lifts and un-blurs its content the first time it scrolls into view. */
export const Reveal = ({ children, delay = 0, className, as = "div", fade = true, blur = true }: RevealProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const [animate] = useState(canAnimateOnMount);

  if (reduceMotion || !animate) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ y: 24, ...(fade && { opacity: 0 }), ...(fade && blur && { filter: "blur(6px)" }) }}
      whileInView={{ y: 0, ...(fade && { opacity: 1 }), ...(fade && blur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
};

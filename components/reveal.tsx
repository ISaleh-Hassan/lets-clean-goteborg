"use client";

import { useEffect, type ReactNode } from "react";
import { animate, motion, MotionConfig, useMotionValue, useTransform } from "framer-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
  >{children}</motion.div>;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } } };

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>{children}</motion.div>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={item}>{children}</motion.div>;
}

// Plays on page load, for hero content
export function HeroIn({ children, className, delay = 0, x = 0 }: { children: ReactNode; className?: string; delay?: number; x?: number }) {
  return <motion.div
    className={className}
    initial={{ opacity: 0, y: 22, x }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >{children}</motion.div>;
}

export function AnimatedNumber({ value, suffix = " kr" }: { value: number; suffix?: string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `${Math.round(v).toLocaleString("sv-SE")}${suffix}`);
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.5, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

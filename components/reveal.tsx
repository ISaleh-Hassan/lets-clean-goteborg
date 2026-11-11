"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay }}>{children}</motion.div>;
}

import { motion } from 'motion/react';

export function SectionConnector({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative h-32 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={reverse ? "M0,50 Q300,10 600,50 T1200,50 L1200,100 L0,100 Z" : "M0,0 L1200,0 L1200,50 Q900,90 600,50 T0,50 Z"}
          fill="currentColor"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </svg>
      
      {/* Decorative line */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      />
    </div>
  );
}

import { motion } from 'framer-motion';

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (dir) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Slide({ children, direction }) {
  return (
    <motion.section
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12 overflow-y-auto"
    >
      <div className="w-full max-w-6xl">{children}</div>
    </motion.section>
  );
}

// Petit conteneur pour animer les enfants en cascade
export function StaggerGroup({ children, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7, ease: 'easeOut' },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
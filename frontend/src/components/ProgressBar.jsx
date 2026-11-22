import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );
}
import { motion } from 'framer-motion';

export default function DecayCard({
  children,
  className = '',
  image = '',
}) {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className={`relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 group shadow-sm hover:shadow-2xl transition-all duration-500 ${className}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          variants={{
            initial: { scale: 1, filter: 'grayscale(0.5)' },
            hover: { scale: 1.1, filter: 'grayscale(0)' },
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

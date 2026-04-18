import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  separator = ' ',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);
    }
  }, [inView, delay, to, from, direction, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('fr-FR').format(latest.toFixed(0)).replace(/\s/g, separator);
      }
    });
  }, [springValue, separator]);

  return <span ref={ref} className={className} />;
}

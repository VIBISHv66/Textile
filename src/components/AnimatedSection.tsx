import React from 'react';
import { motion } from 'motion/react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
  className?: string;
  id?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  id,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0.1, x: -30 };
      case 'right':
        return { opacity: 0.1, x: 30 };
      case 'up':
      default:
        return { opacity: 0.1, y: 20 };
    }
  };

  return (
    <motion.div
      id={id}
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "100px 0px 100px 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

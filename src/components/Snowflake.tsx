import React from 'react';
import { motion } from 'framer-motion';

const Snowflake: React.FC<{ size: number; left: number; delay: number }> = ({ size, left, delay }) => {
  return (
    <motion.div
      className="absolute top-0 bg-white rounded-full"
      style={{ width: size, height: size, left }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: '100vh' }}
      transition={{ duration: 10, delay, repeat: Infinity, repeatType: 'loop' }}
    />
  );
};

export default Snowflake;
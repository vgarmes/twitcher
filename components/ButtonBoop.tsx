import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  onClick?: () => void;
}

const ButtonBoop: React.FC<Props> = ({ children, onClick }) => {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!clicked) return;

    const timeout = window.setTimeout(() => {
      setClicked(false);
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [clicked]);
  return (
    <button
      className="hover:bg-gray-700 p-1.5 rounded"
      onClick={() => {
        setClicked(true);
        onClick && onClick();
      }}
      disabled={clicked}
    >
      <motion.div
        animate={clicked ? { scale: [0.7, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </button>
  );
};

export default ButtonBoop;

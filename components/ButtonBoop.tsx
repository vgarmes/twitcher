import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {}

const ButtonBoop: React.FC<Props> = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!clicked) return;

    const timeout = window.setTimeout(() => {
      setClicked(false);
    }, 200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [clicked]);
  return (
    <button
      className="hover:bg-gray-700 p-1.5 rounded"
      onClick={() => setClicked(true)}
    >
      <motion.div animate={clicked ? { scale: 0.5 } : { scale: 1 }}>
        {children}
      </motion.div>
    </button>
  );
};

export default ButtonBoop;

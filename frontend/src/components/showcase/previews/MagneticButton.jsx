import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MagneticButton = () => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative rounded-full border border-white/20 bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
    >
      <span className="relative z-10">Magnetic Button</span>
    </motion.button>
  );
};

export default MagneticButton;

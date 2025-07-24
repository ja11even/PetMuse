import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import styled from "styled-components";

const MotionWrapper = styled(motion.div)`
  will-change: transform, opacity;
`;
const scrollVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
export default function ScrollReveal({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <MotionWrapper
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={scrollVariants}
      transition={{ delay }}
    >
      {children}
    </MotionWrapper>
  );
}

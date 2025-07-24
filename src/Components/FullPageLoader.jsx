import styled from "styled-components";
import { motion } from "framer-motion";
function FullPageLoader() {
  return (
    <FullPage>
      {[...Array(3)].map((_, index) => (
        <LoaderBox
          key={index}
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: index * 0.2,
          }}
        />
      ))}
    </FullPage>
  );
}

const FullPage = styled.div`
  background-color: #fce9d0;
  display: flex;
  width: 100%;
  height: 100dvh;
  align-items: center;
  justify-content: center;
`;
const LoaderBox = styled(motion.div)`
  background-color: #ed4a2f;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: inline-block;
  margin-left: 5px;
`;
export default FullPageLoader;

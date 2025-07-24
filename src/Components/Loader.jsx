import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
function Loader() {
  const [openSidebar, _setOpenSidebar] = useState(false);
  return (
    <MainLayoutContainer openSidebar={openSidebar}>
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
    </MainLayoutContainer>
  );
}

const MainLayoutContainer = styled.div`
  flex: 4;
  overflow-y: auto;
  background-color: #fce9d0;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 2rem;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  @media (max-width: 767px) {
    width: 100%;
    transform: ${({ openSidebar }) =>
      openSidebar ? "translateX(75%)" : "translateX(0)"};
    padding-top: 2rem;
    padding: 1.8rem;
  }
`;

const LoaderBox = styled(motion.div)`
  background-color: #ed4a2f;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: inline-block;
  margin-left: 5px;
`;
export default Loader;

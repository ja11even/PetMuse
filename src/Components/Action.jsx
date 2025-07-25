import styled from "styled-components";
import { Heading } from "./Heading";
import { Laptop, Smartphone } from "lucide-react";
import { useRef, useState } from "react";
import desktop from "/src/assets/desktop2.png";
import mobile from "/src/assets/mobile.png";
import { useInView, motion } from "framer-motion";

function Action() {
  const [showDesktop, setShowDesktop] = useState(false);

  const headerRef = useRef(null);
  const isheaderRefInView = useInView(headerRef, { once: true });

  const buttonRef = useRef(null);
  const isbuttonRefInView = useInView(buttonRef, { once: true });

  const imageRef = useRef(null);
  const isimageRefInView = useInView(imageRef, { once: true });
  return (
    <ActionContainer>
      <ContainerOne>
        <HeaderDiv
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isheaderRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h2">PetMuse In Action</Heading>
          <ContainerOneText>
            Explore how PetMuse helps you manage your pet's care with ease.
          </ContainerOneText>
        </HeaderDiv>
        <Buttons
          ref={buttonRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isbuttonRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Phone
            showDesktop={!showDesktop}
            onClick={() => {
              setShowDesktop(false);
            }}
          >
            <Smartphone />
            Mobile
          </Phone>
          <Desktop
            showDesktop={showDesktop}
            onClick={() => setShowDesktop(true)}
          >
            <Laptop />
            Desktop
          </Desktop>
        </Buttons>
      </ContainerOne>
      <ContainerTwo>
        {showDesktop ? (
          <DesktopDiv
            ref={imageRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isimageRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Img src={desktop} />
          </DesktopDiv>
        ) : (
          <PhoneDiv
            ref={imageRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isimageRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Img src={mobile} />
          </PhoneDiv>
        )}
      </ContainerTwo>
    </ActionContainer>
  );
}
const ActionContainer = styled.div`
  height: 870px;
  max-width: 1350px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    height: 700px;
  }
  @media (max-width: 767px) {
    height: 580px;
  }
`;
const ContainerOne = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  line-height: 1.4;
  @media (max-width: 767px) {
    max-width: 500px;
    text-align: center;
  }
`;
const ContainerOneText = styled.p`
  font-size: 1.3rem;
  @media (max-width: 767px) {
    max-width: 320px;
    font-size: 1.25rem;
  }
`;
const Phone = styled.button`
  font-family: inherit;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: ${({ showDesktop }) => (showDesktop ? "#ffffff" : "#ed4a2f")};
  background-color: ${({ showDesktop }) =>
    showDesktop ? "#ed4a2f" : "#ffffff"};
  &:hover {
    cursor: pointer;
  }
`;
const Desktop = styled.button`
  font-family: inherit;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: ${({ showDesktop }) => (showDesktop ? "#ffffff" : "#ed4a2f")};
  background-color: ${({ showDesktop }) =>
    showDesktop ? "#ed4a2f" : "#ffffff"};
  &:hover {
    cursor: pointer;
  }
`;
const Buttons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 20px;
  z-index: 500;
`;
const HeaderDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContainerTwo = styled(motion.div)`
  text-align: center;
`;
const DesktopDiv = styled(motion.div)`
  text-align: center;
`;
const PhoneDiv = styled(motion.div)``;
const Img = styled.img`
  object-fit: contain;
  height: 650px;
  margin-top: -60px;
  @media (max-width: 1024px) {
    height: 500px;
    width: 750px;
    margin-top: -20px;
  }
  @media (max-width: 767px) {
    height: 350px;
    width: 340px;
    margin-top: -20px;
  }
`;

export default Action;

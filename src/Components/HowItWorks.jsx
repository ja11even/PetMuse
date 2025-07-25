import styled from "styled-components";
import { Heading } from "./Heading";
import { CalendarCheck, PawPrint, UserRoundPlus } from "lucide-react";
import { Element, scroller } from "react-scroll";
import { useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";

function HowItWorks() {
  const headerRef = useRef(null);
  const isheaderRefInView = useInView(headerRef, { once: true });

  const box1 = useRef(null);
  const isbox1InView = useInView(box1, { once: true });
  const box2 = useRef(null);
  const isbox2InView = useInView(box2, { once: true });
  const box3 = useRef(null);
  const isbox3InView = useInView(box3, { once: true });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      scroller.scrollTo(hash.replace("#", ""), {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, []);
  return (
    <Element name="howitworks">
      <HITContainer>
        <ContainerOne
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isheaderRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h2">How It Works</Heading>
          <HeaderText>
            Get started with PetMuse in three simple steps
          </HeaderText>
        </ContainerOne>
        <ContainerTwo>
          <Box
            ref={box1}
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={
              isbox1InView
                ? { opacity: 1, y: 0, scale: 1 }
                : { scale: 0.5, opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <IconDiv>
              <UserRoundPlus size={30} />
            </IconDiv>
            <Heading as="h3">Sign Up</Heading>
            <BoxText>
              Create your free account in seconds and get started right away.
            </BoxText>
            <NumberDiv>1</NumberDiv>
          </Box>
          <Box
            ref={box2}
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={
              isbox2InView
                ? { opacity: 1, y: 0, scale: 1 }
                : { scale: 0.5, opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <IconDiv>
              <PawPrint size={30} fill="#ed4a2f" />
            </IconDiv>
            <Heading as="h3">Add Your Pets</Heading>
            <BoxText>
              Create profiles for each of your pets with their details and
              photos.
            </BoxText>
            <NumberDiv>2</NumberDiv>
          </Box>
          <Box
            ref={box3}
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={
              isbox3InView
                ? { opacity: 1, y: 0, scale: 1 }
                : { scale: 0.5, opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <IconDiv>
              <CalendarCheck size={30} />
            </IconDiv>
            <Heading as="h3">Plan & Track Care</Heading>
            <BoxText>
              Schedule appointments, set reminders, and track health metrics.
            </BoxText>
            <NumberDiv>3</NumberDiv>
          </Box>
        </ContainerTwo>
      </HITContainer>
    </Element>
  );
}

const HITContainer = styled.div`
  background-color: #ffffff;
  height: 560px;
  @media (max-width: 1024px) {
    height: 1050px;
  }
  @media (max-width: 767px) {
    height: 1040px;
  }
`;

const ContainerOne = styled(motion.div)`
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  line-height: 1.4;
  @media (max-width: 767px) {
  }
`;
const HeaderText = styled.p`
  font-size: 1.3rem;
  @media (max-width: 767px) {
    max-width: 300px;
    font-size: 1.15rem;
    text-align: center;
  }
`;
const ContainerTwo = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1350px;
  margin: 50px auto;
  gap: 1rem;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    gap: 1.5rem;
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    gap: 1.5rem;
  }
`;

const Box = styled(motion.div)`
  width: 32.5%;
  border: 1px solid #ed4a2f;
  height: 230px;
  padding: 2rem;
  position: relative;
  border-radius: 10px;
  @media (max-width: 1024px) {
    width: 88%;
    margin: 0 auto;
    padding: 1.7rem;
  }
  @media (max-width: 767px) {
    width: 88%;
    margin: 0 auto;
    padding: 1.7rem;
  }
`;
const BoxText = styled.p`
  font-size: 1.1rem;
  margin-top: 10px;
  @media (max-width: 767px) {
    line-height: 1.4;
  }
`;
const IconDiv = styled.div`
  height: 50px;
  width: 50px;
  background-color: #fce9d0;
  border-radius: 50%;
  color: #ed4a2f;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const NumberDiv = styled.div`
  background-color: #fce9d0;
  color: #ed4a2f;
  position: absolute;
  height: 30px;
  width: 30px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  right: -10px;
  top: -13px;
  @media (max-width: 767px) {
    height: 28px;
    width: 28px;
    font-size: 1.1rem;
  }
`;
export default HowItWorks;

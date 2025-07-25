import styled from "styled-components";
import { Heading } from "./Heading";
import pet2 from "../assets/pet2.jpg";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { motion } from "framer-motion";
function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  return (
    <HeroContainer
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <LeftContainer>
        <motion.div variants={textVariants}>
          <Heading as="h1">
            Care smarter. Plan better. Love deeper- With PetMuse.
          </Heading>
        </motion.div>
        <motion.div variants={textVariants}>
          <StyledText>
            The all-in-one pet care planner to manage health logs, appointments,
            tasks, and notes for all your furry friends.
          </StyledText>
        </motion.div>
        <motion.div variants={buttonVariants}>
          <Buttons>
            <ButtonLink to="/signup">
              <GetStarted>
                Get Started <ChevronRight size={21} />
              </GetStarted>
            </ButtonLink>
            <LinkScroll to="features" smooth={true} duration={500}>
              <LearnMore>Learn More</LearnMore>
            </LinkScroll>
          </Buttons>
        </motion.div>
      </LeftContainer>
      <RightContainer>
        <motion.div variants={imageVariants}>
          <Img src={pet2} />
        </motion.div>
      </RightContainer>
    </HeroContainer>
  );
}

const HeroContainer = styled(motion.div)`
  height: 600px;
  max-width: 1350px;
  margin: 7% auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    height: 950px;
  }
  @media (max-width: 767px) {
    height: 995px;
    display: flex;
    flex-direction: column;
  }
`;
const LeftContainer = styled.div`
  height: 500px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1024px) {
    width: 90%;
    margin-right: 0.5%;
    margin-top: 12%;
  }
  @media (max-width: 767px) {
    width: 90%;
    margin-right: 0.5%;
    margin-top: 30%;
  }
`;
const StyledText = styled.p`
  font-size: 1.3rem;
  margin-top: 5px;
  width: 600px;
  @media (max-width: 1024px) {
    width: 600px;
    font-size: 1.3rem;
  }
  @media (max-width: 767px) {
    width: 330px;
    font-size: 1.25rem;
  }
`;
const RightContainer = styled.div`
  width: 50%;
  @media (max-width: 1024px) {
    width: 90%;
    margin-top: 30px;
  }
  @media (max-width: 767px) {
    width: 90%;
    margin-top: 30px;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 15px;
  @media (max-width: 767px) {
    gap: 1rem;
  }
`;
const GetStarted = styled.button`
  border: none;
  padding: 1rem;
  font-size: 1rem;
  background-color: #ed4a2f;
  color: #ffffff;
  border-radius: 5px;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #ed4a2f;
    color: white;
  }
`;
const LearnMore = styled.button`
  border: none;
  padding: 1rem;
  font-size: 1rem;
  background-color: #ffffff;
  border-radius: 5px;
  font-family: inherit;
  color: #ed4a2f;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
    color: #ed4a2f;
  }
`;
const Img = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
`;
const ButtonLink = styled(Link)`
  text-decoration: none;
`;
export default Hero;

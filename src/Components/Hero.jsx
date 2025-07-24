import styled from "styled-components";
import { Heading } from "./Heading";
import pet2 from "../assets/pet2.jpg";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
function Hero() {
  return (
    <HeroContainer>
      <LeftContainer>
        <Heading as="h1">
          Care smarter. Plan better. Love deeper- With PetMuse.
        </Heading>
        <StyledText>
          The all-in-one pet care planner to manage health logs, appointments,
          tasks, and notes for all your furry friends.
        </StyledText>
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
      </LeftContainer>
      <RightContainer>
        <Img src={pet2} />
      </RightContainer>
    </HeroContainer>
  );
}

const HeroContainer = styled.div`
  height: 600px;
  max-width: 1350px;
  margin: 7% auto;
  display: flex;
  align-items: center;
  gap: 1rem;
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
  @media (max-width: 767px) {
    width: 330px;
    font-size: 1.25rem;
  }
`;
const RightContainer = styled.div`
  width: 50%;
  @media (max-width: 767px) {
    width: 90%;
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

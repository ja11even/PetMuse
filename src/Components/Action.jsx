import styled from "styled-components";
import { Heading } from "./Heading";
import { Laptop, Smartphone } from "lucide-react";
import { useState } from "react";
import desktop from "/src/assets/desktop2.png";
import mobile from "/src/assets/mobile.png";

function Action() {
  const [showMobile, setShowMobile] = useState(false);
  return (
    <ActionContainer>
      <ContainerOne>
        <Heading as="h2">PetMuse In Action</Heading>
        <ContainerOneText>
          Explore how PetMuse helps you manage your pet's care with ease.
        </ContainerOneText>
        <Buttons>
          <Desktop
            showMobile={!showMobile}
            onClick={() => setShowMobile(false)}
          >
            <Laptop />
            Desktop
          </Desktop>
          <Phone
            showMobile={showMobile}
            onClick={() => {
              setShowMobile(true);
              console.log("booty");
            }}
          >
            <Smartphone />
            Mobile
          </Phone>
        </Buttons>
      </ContainerOne>
      <ContainerTwo>
        {showMobile ? (
          <PhoneDiv>
            <Img src={mobile} />
          </PhoneDiv>
        ) : (
          <DesktopDiv>
            <Img src={desktop} />
          </DesktopDiv>
        )}
      </ContainerTwo>
      <Briefing>
        <Heading as="h3">Dashboard Overview</Heading>
        <BriefText>
          Get a quick overview of all your pets upcoming appointments and tasks
        </BriefText>
      </Briefing>
    </ActionContainer>
  );
}
const ActionContainer = styled.div`
  height: 850px;
  max-width: 1350px;
  margin: 0 auto;
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
  padding: 0.5rem;
  border-radius: 5px;
  color: ${({ showMobile }) => (showMobile ? "#ffffff" : "#ed4a2f")};
  background-color: ${({ showMobile }) => (showMobile ? "#ed4a2f" : "#ffffff")};
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
  padding: 0.5rem;
  border-radius: 5px;
  color: ${({ showMobile }) => (showMobile ? "#ffffff" : "#ed4a2f")};
  background-color: ${({ showMobile }) => (showMobile ? "#ed4a2f" : "#ffffff")};
  &:hover {
    cursor: pointer;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 20px;
  z-index: 500;
`;
const ContainerTwo = styled.div`
  text-align: center;
`;
const DesktopDiv = styled.div`
  text-align: center;
`;
const PhoneDiv = styled.div``;
const Img = styled.img`
  object-fit: contain;
  height: 600px;
  margin-top: -50px;
  @media (max-width: 767px) {
    border: 1px solid black;
  }
`;
const Briefing = styled.div`
  text-align: center;
  line-height: 1.4;
  margin-top: -40px;
`;
const BriefText = styled.p``;
export default Action;

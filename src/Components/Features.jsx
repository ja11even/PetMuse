import styled from "styled-components";
import { Heading } from "./Heading";
import {
  Bell,
  Calendar,
  FileText,
  Heart,
  NotebookPen,
  Pill,
  UsersRound,
} from "lucide-react";
import { Element, scroller } from "react-scroll";
import { useEffect } from "react";
function Features() {
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
    <Element name="features">
      <FeaturesContainer>
        <ContainerOne>
          <Heading as="h2">Features Designed For Pet Parents</Heading>
          <HeaderText>
            Everything you need to keep your pets healthy and happy in one place
          </HeaderText>
        </ContainerOne>
        <ContainerTwo>
          <Box>
            <IconDiv>
              <UsersRound />
            </IconDiv>
            <Heading as="h3">Multi-pet care</Heading>
            <BoxText>
              Manage multiple pets in one place with individual profiles and
              care plans.
            </BoxText>
          </Box>
          <Box>
            <IconDiv>
              <Calendar />
            </IconDiv>
            <Heading as="h3">Calendar scheduling</Heading>
            <BoxText>
              Schedule and track vet visits, grooming, training, and other
              important events.
            </BoxText>
          </Box>
          <Box>
            <IconDiv>
              <Heart />
            </IconDiv>
            <Heading as="h3">Health tracking</Heading>
            <BoxText>
              Log medications, vaccinations, weight, and other health metrics
              over time.
            </BoxText>
          </Box>
          <Box>
            <IconDiv>
              <NotebookPen />
            </IconDiv>
            <Heading as="h3">Notes</Heading>
            <BoxText>
              Add personal reminders, to-dos, or cute little thoughts for any
              pet directly on the dashboard.
            </BoxText>
          </Box>
          <Box>
            <IconDiv>
              <FileText />
            </IconDiv>
            <Heading as="h3">PDF export</Heading>
            <BoxText>
              Export health logs and appointment records to share with vets or
              keep as a backup.
            </BoxText>
          </Box>
          <Box>
            <IconDiv>
              <Bell />
            </IconDiv>
            <Heading as="h3">Reminders & alerts</Heading>
            <BoxText>
              Never miss an important appointment or medication with
              customizable alerts.
            </BoxText>
          </Box>
        </ContainerTwo>
      </FeaturesContainer>
    </Element>
  );
}

const FeaturesContainer = styled.div`
  background-color: #ffffff;
  height: 750px;
  @media (max-width: 767px) {
    height: 1695px;
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
    text-align: center;
  }
`;
const HeaderText = styled.p`
  font-size: 1.3rem;
  @media (max-width: 767px) {
    max-width: 330px;
    font-size: 1.25rem;
  }
`;
const ContainerTwo = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1350px;
  margin: 40px auto;
  gap: 1rem;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    gap: 0.5rem;
  }
`;

const Box = styled.div`
  width: 32.5%;
  height: 220px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    width: 88%;
    margin: 0 auto;
    padding: 0rem;
    justify-content: center;
  }
`;
const BoxText = styled.p`
  font-size: 1.1rem;
  text-align: center;
  @media (max-width: 767px) {
    line-height: 1.4;
    max-width: 330px;
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
export default Features;

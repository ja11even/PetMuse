import styled from "styled-components";
import Footer from "../Components/Footer";
import { CheckCircle, ChevronRight, Dot } from "lucide-react";
import { Heading } from "../Components/Heading";
import { Link } from "react-router-dom";
import AuthNavbar from "../Components/AuthNavbar";
import WelcomeForm from "../Forms/WelcomeForm";

function Welcome() {
  return (
    <>
      <AuthNavbar />
      <WelcomeContainer>
        <Welcom>
          <ContainerOne>
            <IconDiv>
              <CheckCircle color="#00c950" size={65} />
            </IconDiv>
            <Heading as="h5">Welcome to PetMuse!</Heading>
            <HeaderText>
              Your account has been created successfully. Let's complete your
              profile to get started.
            </HeaderText>
          </ContainerOne>
          <ContainerTwo>
            <CardHeader>
              <Heading as="h6">Complete your profile</Heading>
              <BoxHeaderText>
                Provide your name to personalize your PetMuse experience
              </BoxHeaderText>
            </CardHeader>
            <WelcomeForm />
            <InfoCard>
              <InfoText>What's next?</InfoText>
              <InfoMenu>
                <InfoItem>Add your first pet profile</InfoItem>
                <InfoItem>Schedule upcoming appointments</InfoItem>
                <InfoItem>Set up health reminders</InfoItem>
              </InfoMenu>
            </InfoCard>
          </ContainerTwo>
        </Welcom>
      </WelcomeContainer>
      <Footer />
    </>
  );
}

const WelcomeContainer = styled.div`
  height: 900px;
  background-color: #ffffff;
  @media (max-width: 767px) {
    height: 943px;
  }
`;
const Welcom = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContainerOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 47px;
  line-height: 1.4;
  @media (max-width: 767px) {
    max-width: 91%;
    width: 350px;
  }
`;
const ContainerTwo = styled.div`
  border: 1px solid #ed4a2f;
  min-height: 560px;
  max-height: 620px;
  margin-top: 30px;
  width: 470px;
  padding: 2rem;
  border-radius: 10px;
  @media (max-width: 767px) {
    max-width: 89%;
    padding: 1.5rem 1.1rem;
  }
`;
const IconDiv = styled.div``;
const HeaderText = styled.p`
  font-size: 1.1rem;
  @media (max-width: 767px) {
    text-align: center;
    width: 310px;
  }
`;
const BoxText = styled.p``;
const Box = styled.div`
  border: 1px solid #ed4a2f;
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 1rem;
  height: 90px;
  padding: 0rem 1rem;
  border-radius: 10px;
`;
const NumberDiv = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #fce9d0;
  color: #ed4a2f;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoxTexts = styled.div`
  line-height: 1.5rem;
`;
const BoxTextOne = styled.p`
  color: #ed4a2f;
  font-size: 1.1rem;
`;
const Dashboard = styled.button`
  border: none;
  padding: 0.7rem;
  width: 100%;
  font-size: 1rem;
  background-color: #ed4a2f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 5px;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const CardHeader = styled.div`
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
  }
`;
const BoxHeaderText = styled.p`
  margin-bottom: 15px;
  text-align: center;
  @media (max-width: 767px) {
    width: 300px;
  }
`;
const InfoCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 1rem 0rem;
  border-radius: 10px;
  background-color: #fffaf4;
`;
const InfoMenu = styled.ul`
  list-style: none;
  text-align: center;
`;
const InfoItem = styled.li`
  font-size: 0.9rem;
  color: #ed4a2f;
`;
const InfoText = styled.p`
  margin-bottom: 10px;
  //color: #ed4a2f;
  font-size: 1rem;
`;
export default Welcome;

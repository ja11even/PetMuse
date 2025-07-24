import styled from "styled-components";
import { Heading } from "../Components/Heading";
import Footer from "../Components/Footer";
import { Dot } from "lucide-react";
import ProgressNavbar from "../Components/ProgressNavbar";

function Privacy() {
  return (
    <>
      <ProgressNavbar />
      <TermsContainer>
        <Term>
          <ContainerOne>
            <Heading as="h2">Privacy Policy</Heading>
            <HeaderText>
              <span style={{ color: "#ed4a2f" }}>Last updated:</span> June 14,
              2025
            </HeaderText>
          </ContainerOne>
          <ContainerTwo>
            <Box>
              <Heading as="h4">1. Introduction</Heading>
              <BoxText>
                Welcome to PetMuse. We are committed to protecting your privacy
                and the privacy of your pets information. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our pet care planning service.
              </BoxText>
              <BoxTextOne>
                By using PetMuse, you agree to the collection and use of
                information in accordance with this policy.
              </BoxTextOne>
            </Box>
            <Box>
              <Heading as="h4">2. Information We Collect</Heading>
              <MiniBox>
                <MiniBoxText>2.1 Personal Information</MiniBoxText>
                <BoxText>
                  We may collect the following personal information:
                </BoxText>
              </MiniBox>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Name and contact information</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Account credentials (username, password)</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Profile information and preferences</DotText>
                </TextDiv>
              </TextDivContainer>
              <MiniBox>
                <MiniBoxText>2.2 Pet Information</MiniBoxText>
                <BoxText>
                  We collect information about your pets, including:
                </BoxText>
              </MiniBox>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Pet names, breeds, ages, weight</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Health records, and veterinary information</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Medication schedules and treatment plans</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Appointment history and care notes</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Photos and documents you upload</DotText>
                </TextDiv>
              </TextDivContainer>
              <MiniBox>
                <MiniBoxText>2.3 Usage Information</MiniBoxText>
                <BoxText>
                  We automatically collect certain information when you use our
                  service:
                </BoxText>
              </MiniBox>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Device information ( IP address)</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Usage patterns and feature interactions</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Log files and analytics data</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Cookies and similar tracking technologies</DotText>
                </TextDiv>
              </TextDivContainer>
            </Box>
            <Box>
              <Heading as="h4">3. How We Use Information</Heading>
              <BoxText>
                We use the collected information for the following purposes:
              </BoxText>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Provide and maintain our planning services</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Send appointment reminders, health logs</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Improve our services</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Communicate with you about updates</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Ensure security and prevent fraud</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Comply with legal obligations</DotText>
                </TextDiv>
              </TextDivContainer>
            </Box>
            <Box>
              <Heading as="h4">4. Information Sharing</Heading>
              <BoxText>
                We do not sell, trade, or rent your personal information. We may
                share your information in the following circumstances:
              </BoxText>
              <MiniBox>
                <MiniBoxText>4.1 Service Providers</MiniBoxText>
                <BoxText>
                  We may share information with trusted third-party service
                  providers who assist us in:
                </BoxText>
              </MiniBox>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Email and notification services</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Cloud hosting and data storage</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Analytics and performance monitoring</DotText>
                </TextDiv>
              </TextDivContainer>
              <MiniBox>
                <MiniBoxText>4.2 Legal Requirements</MiniBoxText>
                <BoxText>
                  We may disclose information when required by law or to:
                </BoxText>
              </MiniBox>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Comply with legal processes</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Protect our rights, property, or safety</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Prevent fraud or security threats</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Enforce our Terms of Service</DotText>
                </TextDiv>
              </TextDivContainer>
            </Box>
            <Box>
              <Heading as="h4">5. Data Security</Heading>
              <BoxText>
                We implement appropriate technical and organizational security
                measures to protect your information against unathorized access,
                alteration, disclosure, or destruction. These measures include:
              </BoxText>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Encryption of data in transit and at rest</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Regular secuirty assessments and updates</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Authentication requirements</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Secure data centers and backup systems</DotText>
                </TextDiv>
              </TextDivContainer>
              <BoxText>
                However, no method of transmission over the internet or
                electronic storage is 100% secure. While we strive to protect
                your information, we cannot guarantee absolute security.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">6. Data Retention</Heading>
              <BoxText>
                We retain your information for as long as necessary to provide
                our services and fulfill the purposes outlined in this policy.
                Specifically:
              </BoxText>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>
                    Account information is retained while active
                  </DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>
                    Usage data is typically retained for 2 years
                  </DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Legal compliance may require longer periods</DotText>
                </TextDiv>
              </TextDivContainer>
            </Box>
            <Box>
              <Heading as="h4">7. Children's Privacy</Heading>
              <BoxText>
                PetMuse is not intended for children under 13 years of age. We
                do not knowingly collect personal information from children
                under 13. If we become aware that we have collected personal
                information from a child under 13, we will take steps to delete
                such information.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">8. Data Transfers</Heading>
              <BoxText>
                Your information may be transferred to and processed in
                countries other than your own. We ensure that such transfers
                comply with applicable data protection laws and implement
                appropriate safeguards to protect your information.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">9. Cookies</Heading>
              <BoxText>
                We use cookies and similar technologies to enhance your
                experience, analyze usage, and provide personalized content.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">10. Changes to This Policy</Heading>
              <BoxText>
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the "Last updated" date. We encourage you
                to review this policy periodically.
              </BoxText>
            </Box>
          </ContainerTwo>
        </Term>
      </TermsContainer>
      <Footer />
    </>
  );
}
const TermsContainer = styled.div`
  background-color: #ffffff;
  height: 3483px;
  @media (max-width: 767px) {
    height: 4280px;
  }
`;
const Term = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding-top: 50px;
  @media (max-width: 767px) {
    max-width: 88%;
  }
`;
const ContainerOne = styled.div``;
const ContainerTwo = styled.div`
  margin-top: 35px;
`;
const BoxTextOne = styled.p`
  margin-top: 10px;
  font-size: 1.1rem;
`;
const BoxText = styled.p`
  font-size: 1.1rem;
  margin-top: 10px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;
const DotText = styled.p`
  font-size: 1rem;
`;
const Box = styled.div`
  margin-bottom: 30px;
`;
const HeaderText = styled.p`
  font-size: 1.1rem;
  margin-left: 4px;
  margin-top: 10px;
`;
const TextDivContainer = styled.div`
  margin-top: 10px;
`;
const TextDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const MiniBox = styled.div``;
const MiniBoxText = styled.p`
  font-size: 1.2rem;
  color: #ed4a2f;
  margin-top: 15px;
`;
const Disclaimer = styled.div`
  background-color: #fce9d0;
  display: flex;
  height: 140px;
  align-items: center;
  gap: 1rem;
  margin-top: 10px;
`;
const DisclaimerDiv = styled.div`
  height: 140px;
  width: 3px;
  background-color: #ed4a2f;
`;
const DisclaimerText = styled.p`
  width: 860px;
`;
export default Privacy;

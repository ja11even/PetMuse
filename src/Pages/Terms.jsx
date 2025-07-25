import styled from "styled-components";
import { Heading } from "../Components/Heading";
import Footer from "../Components/Footer";
import { Dot } from "lucide-react";
import ProgressNavbar from "../Components/ProgressNavbar";

function Terms() {
  return (
    <>
      <ProgressNavbar />
      <TermsContainer>
        <Term>
          <ContainerOne>
            <Heading as="h2">Terms of Service</Heading>
            <HeaderText>
              <span style={{ color: "#ed4a2f" }}>Last updated:</span> June 14,
              2025
            </HeaderText>
          </ContainerOne>
          <ContainerTwo>
            <Box>
              <Heading as="h4">1. Acceptance of Terms</Heading>
              <BoxText>
                Welcome to PetMuse. These Terms of Service{" "}
                <span style={{ color: "#ed4a2f" }}>("Terms")</span> govern your
                use of the PetMuse website
                <span style={{ color: "#ed4a2f" }}> (the "Service")</span>{" "}
                operated by PetMuse.
              </BoxText>
              <BoxTextOne>
                By accessing or using our Service, you agree to be bound by
                these Terms. If you disagree with any part of these terms, then
                you may not access the Service.
              </BoxTextOne>
            </Box>
            <Box>
              <Heading as="h4">2. Description of Service</Heading>
              <BoxText>
                PetMuse is a pet care planning platform that allows users to:
              </BoxText>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Manage multiple pet profiles</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Schedule veterinary appointments</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Set medication reminders and health alerts</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Store and organize pet-related documents</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Share pet information with individuals</DotText>
                </TextDiv>
              </TextDivContainer>
            </Box>
            <Box>
              <Heading as="h4">3. User Accounts</Heading>
              <MiniBox>
                <MiniBoxText>3.1 Account Creation</MiniBoxText>
                <BoxText>
                  To use certain features of the Service, you must create an
                  account. You agree to:
                </BoxText>
              </MiniBox>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Provide accurate and current information</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Maintain your account information</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Keep your password secure</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Accept responsibility for all activities</DotText>
                </TextDiv>
              </TextDivContainer>
              <MiniBox>
                <MiniBoxText>3.2 Account Eligibility</MiniBoxText>
                <BoxText>
                  You must be at least 18 years old to create an account. By
                  creating an account, you represent that you meet this age
                  requirement and have the legal capacity to enter into these
                  Terms.
                </BoxText>
              </MiniBox>
              <MiniBox>
                <MiniBoxText>3.3 Account Termination</MiniBoxText>
                <BoxText>
                  You may terminate your account at any time. We may suspend or
                  terminate your account if you violate these Terms or engage in
                  prohibited activities.
                </BoxText>
              </MiniBox>
            </Box>
            <Box>
              <Heading as="h4">4. Acceptable Use</Heading>
              <BoxText>You agree not to use the Service to:</BoxText>
              <TextDivContainer>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Violate any applicable laws or regulations</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Infringe on intellectual property rights</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Upload malicious or harmful content</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Impersonate others</DotText>
                </TextDiv>
                <TextDiv>
                  <Dot size={30} color="#ed4a2f" />
                  <DotText>Interfere with the service's operation</DotText>
                </TextDiv>
              </TextDivContainer>
            </Box>
            <Box>
              <Heading as="h4">5. Pet Information</Heading>
              <MiniBox>
                <MiniBoxText>5.1 Information Accuracy</MiniBoxText>
                <BoxText>
                  You are responsible for the accuracy and completeness of all
                  pet information you provide. We do not verify the accuracy of
                  user-submitted information.
                </BoxText>
              </MiniBox>
              <MiniBox>
                <MiniBoxText>5.2 Medical Disclaimer</MiniBoxText>
                <Disclaimer>
                  <DisclaimerDiv></DisclaimerDiv>
                  <DisclaimerText>
                    <span style={{ color: "#ed4a2f", fontWeight: "bold" }}>
                      Important:
                    </span>{" "}
                    PetMuse is not a substitute for professional veterinary
                    care. The Service is designed to help you organize and track
                    your pet's information, but it does not provide medical
                    advice, diagnosis, or treatment recommendations. Always
                    consult with qualified veterinarians for your pet's health
                    concerns.
                  </DisclaimerText>
                </Disclaimer>
              </MiniBox>
              <MiniBox>
                <MiniBoxText>5.3 Emergency Situations</MiniBoxText>
                <BoxText>
                  PetMuse should not be relied upon in emergency situations. In
                  case of a pet emergency, contact your veterinarian or
                  emergency animal hospital immediately.
                </BoxText>
              </MiniBox>
            </Box>
            <Box>
              <Heading as="h4">6. Data Protection</Heading>
              <BoxText>
                Your privacy is important to us. Our collection and use of your
                information is governed by our Privacy Policy, which is
                incorporated into these Terms by reference. By using the
                Service, you consent to the collection and use of your
                information as described in the Privacy Policy.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">7. Intellectual Property </Heading>
              <MiniBox>
                <MiniBoxText>7.1 Our Content</MiniBoxText>
                <BoxText>
                  The Service and its original content, features, and
                  functionality are owned by PetMuse and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws.
                </BoxText>
              </MiniBox>
              <MiniBox>
                <MiniBoxText>7.2 User Content</MiniBoxText>
                <BoxText>
                  You retain ownership of content you submit to the Service. By
                  submitting content, you grant us a non-exclusive, worldwise,
                  royalty-free license to use, reproduce, and display your
                  content solely for the purpose of providing the Service.
                </BoxText>
              </MiniBox>
            </Box>
            <Box>
              <Heading as="h4">8. Disclaimers </Heading>
              <MiniBox>
                <MiniBoxText>8.1 Service Availability</MiniBoxText>
                <BoxText>
                  We strive to maintain high service availability but cannot
                  guarantee uninterrupted access. The Service is provided "as
                  is" without warranties of any kind.
                </BoxText>
              </MiniBox>
              <MiniBox>
                <MiniBoxText>8.2 Limitation of Liability</MiniBoxText>
                <BoxText>
                  To the maximum extent permitted by law, PetMuse shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, including but not limited to loss of
                  profits, data, or other intangible losses.
                </BoxText>
              </MiniBox>
            </Box>
            <Box>
              <Heading as="h4">9. Indemnification</Heading>
              <BoxText>
                You agree to indemnify and hold harmless PetMuse from any
                claims, damages, losses, or expenses arising from your use of
                the Service or violation of these Terms.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">10. Termination</Heading>
              <BoxText>
                We may terminate or suspend your account and access to the
                Service immediately, without prior notice, for conduct that we
                believe violates these Terms or is harmful to other users, us,
                or third parties.
              </BoxText>
              <BoxTextOne>
                Upon termination, your right to use the Service will cease
                immediately. We will provide you with a reasonable opportunity
                to export your data before account deletion.
              </BoxTextOne>
            </Box>
            <Box>
              <Heading as="h4">11. Governing Law</Heading>
              <BoxText>
                These Terms shall be governed by and construed in accordance
                with the laws of Your Country, without regard to its conflict of
                law provisions.
              </BoxText>
              <BoxTextOne>
                Any disputes arising from these Terms or your use of the Service
                shall be resolved through binding arbitration, except that
                either party may seek injuctive relief in court for intellectual
                property violations.
              </BoxTextOne>
            </Box>
            <Box>
              <Heading as="h4">12. Changes to Terms</Heading>
              <BoxText>
                We reserve the right to modify these Terms at any time. We will
                notify users of material changes by email or through the
                Service. Your continued use of the service after changes become
                effective constitutes acceptance of the new Terms.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">13. Severability</Heading>
              <BoxText>
                If any provision of these Terms is held to be invalid or
                unenforceable, the remaining provisions will remain in full
                force and effect.
              </BoxText>
            </Box>
            <Box>
              <Heading as="h4">14. Entire Agreement</Heading>
              <BoxText>
                These Terms, together with our Privacy Policy, constitute the
                entire agreement between you and PetMuse regarding the use of
                the Service and supersede all prior agreements and
                understandings.
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
  height: 4000px;
  @media (max-width: 1024px) {
    height: 4400px;
  }
  @media (max-width: 767px) {
    height: 5900px;
  }
`;
const Term = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding-top: 50px;
  @media (max-width: 1024px) {
    max-width: 600px;
  }
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
  @media (max-width: 767px) {
    height: 245px;
  }
`;
const DisclaimerDiv = styled.div`
  height: 140px;
  width: 3px;
  background-color: #ed4a2f;
  @media (max-width: 767px) {
    height: 245px;
  }
`;
const DisclaimerText = styled.p`
  width: 860px;
  @media (max-width: 767px) {
    padding-right: 15px;
  }
`;
export default Terms;

import styled from "styled-components";
import AuthNavbar from "../Components/AuthNavbar";
import Footer from "../Components/Footer";
import { Heading } from "../Components/Heading";
import ContactForm from "../Forms/ContactForm";

function Contact() {
  return (
    <>
      <AuthNavbar />
      <ContactContainer>
        <FirstContainer>
          <Heading as="h5">Get In Touch</Heading>
          <HeaderText>
            Have questions about PetMuse? Need help? We're here to help you!
          </HeaderText>
        </FirstContainer>
        <Card>
          <CardHeader>
            <Heading as="h6">Send us a message </Heading>
            <BoxHeaderText>
              Fill out the form below and we'll get back to you as soon as
              possible
            </BoxHeaderText>
          </CardHeader>
          <ContactForm />
        </Card>
      </ContactContainer>
      <Footer />
    </>
  );
}

const ContactContainer = styled.div`
  height: 860px;
  background-color: white;
  padding-top: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.4;
  @media (max-width: 767px) {
    max-width: 89%;
    width: 350px;
  }
`;
const HeaderText = styled.p`
  font-size: 1.1rem;
  @media (max-width: 767px) {
    text-align: center;
  }
`;
const Card = styled.div`
  border: 1px solid #ed4a2f;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 470px;
  min-height: 460px;
  max-height: 550px;
  padding: 1.5rem;
  border-radius: 10px;
  @media (max-width: 767px) {
    max-width: 89%;
    padding: 1.5rem 1.1rem;
  }
`;
const CardHeader = styled.div`
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoxHeaderText = styled.p`
  margin-bottom: 15px;
  text-align: center;
  line-height: 1.4;
  @media (max-width: 767px) {
    text-align: center;
  }
`;

export default Contact;

import styled from "styled-components";
import Footer from "../Components/Footer";
import { Heading } from "../Components/Heading";
import SignUpForm from "../Forms/SignUpForm";
import { Link } from "react-router-dom";
import AuthNavbar from "../Components/AuthNavbar";
import discord from "../assets/discord.png";
import google from "../assets/google.png";
import { supabase } from "../Services/Supabase";
function SignUp() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://petmuse.vercel.app/welcome",
      },
    });
    if (error) {
      console.error(error.message);
    }
  };
  const signInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "https://petmuse.vercel.app/welcome",
      },
    });
    if (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <AuthNavbar />
      <SignUpContainer>
        <FirstContainer>
          <Heading as="h5">Create your account</Heading>
          <HeaderText>
            Join thousands of pet parents using PetMuse to care for their furry
            friends
          </HeaderText>
        </FirstContainer>
        <Card>
          <CardHeader>
            <Heading as="h6">Create account</Heading>
            <BoxHeaderText>
              Enter your information to create your PetMuse account
            </BoxHeaderText>
          </CardHeader>
          <SignUpForm />
          <Buttons>
            <GoogleButton onClick={signInWithGoogle}>
              <Img src={google} />
              Google
            </GoogleButton>
            <DiscordButton onClick={signInWithDiscord}>
              <Img src={discord} />
              Discord
            </DiscordButton>
          </Buttons>
          <StyledFooterText>
            Already have an account?
            <StyledFooterLink to="/login"> Log In</StyledFooterLink>
          </StyledFooterText>
        </Card>
      </SignUpContainer>
      <Footer />
    </>
  );
}

const SignUpContainer = styled.div`
  height: 1035px;
  background-color: #ffffff;
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
    max-width: 91%;
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
  min-height: 740px;
  max-height: 820px;
  padding: 1.5rem;
  border-radius: 10px;
  @media (max-width: 767px) {
    max-width: 89%;
    padding: 1.5rem 1.1rem;
    min-height: 760px;
    max-height: 800px;
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
  line-height: 1.4;
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const StyledFooterText = styled.p`
  color: black;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;
const StyledFooterLink = styled(Link)`
  color: #ed4a2f;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -15px;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
`;
const GoogleButton = styled.button`
  border: none;
  border: 1px solid #ed4a2f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  background: transparent;
  font-family: inherit;
  gap: 0.5rem;
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
  text-decoration: none;
  color: black;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
    color: #ed4a2f;
  }
`;
const DiscordButton = styled.button`
  border: none;
  border: 1px solid #ed4a2f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  background: transparent;
  font-family: inherit;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 100%;
  border-radius: 5px;
  text-decoration: none;
  color: black;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
    color: #ed4a2f;
  }
`;
const Img = styled.img`
  height: 25px;
  width: 25px;
`;
export default SignUp;

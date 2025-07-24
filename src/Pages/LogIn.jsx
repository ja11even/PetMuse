import styled from "styled-components";
import Footer from "../Components/Footer";
import { Heading } from "../Components/Heading";
import LogInForm from "../Forms/LogInForm";
import { Link } from "react-router-dom";
import AuthNavbar from "../Components/AuthNavbar";
import google from "../assets/google.png";
import discord from "../assets/discord.png";
import { supabase } from "../Services/Supabase";
function LogIn() {
  const logInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) throw new Error(error.message);
  };
  const logInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) throw new Error(error.message);
  };
  return (
    <>
      <AuthNavbar />
      <LogInContainer>
        <FirstContainer>
          <Heading as="h5">Welcome back</Heading>
          <HeaderText>
            Log in to your account to continue managing your pets care
          </HeaderText>
        </FirstContainer>
        <Card>
          <CardHeader>
            <Heading as="h6">Log In </Heading>
            <BoxHeaderText>
              Enter your email and password to access your account
            </BoxHeaderText>
          </CardHeader>
          <LogInForm />
          <Buttons>
            <GoogleButton onClick={logInWithGoogle}>
              <Img src={google} />
              Google
            </GoogleButton>
            <DiscordButton onClick={logInWithDiscord}>
              <Img src={discord} />
              Discord
            </DiscordButton>
          </Buttons>
          <StyledFooterText>
            Don't have an account?{" "}
            <StyledFooterLink to="/signup">Sign up</StyledFooterLink>
          </StyledFooterText>
        </Card>
      </LogInContainer>
      <Footer />
    </>
  );
}
const LogInContainer = styled.div`
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
  min-height: 500px;
  max-height: 620px;
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
const Img = styled.img`
  height: 25px;
  width: 25px;
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
  font-family: inherit;
  background: transparent;
  gap: 0.5rem;
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
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
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
    color: #ed4a2f;
  }
`;

export default LogIn;

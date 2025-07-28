import styled from "styled-components";
import AuthNavbar from "../Components/AuthNavbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { Heading } from "../Components/Heading";
import ResetPasswordForm from "../Forms/ResetPasswordForm";

function ResetPassword() {
  return (
    <>
      <AuthNavbar />
      <ResetPasswordContainer>
        <FirstContainer>
          <Heading as="h5">Reset your password</Heading>
          <HeaderText>
            Enter a new password below to update your account
          </HeaderText>
        </FirstContainer>
        <Card>
          <CardHeader>
            <Heading as="h6">Set new password</Heading>
            <BoxHeaderText>
              Create a strong password for your account.
            </BoxHeaderText>
          </CardHeader>
          <ResetPasswordForm />
          <StyledFooter2>
            Remember your password?
            <StyledLink2 to="/login">Back to login</StyledLink2>
          </StyledFooter2>
          <StyledFooterText>
            Don't have an account?{" "}
            <StyledFooterLink to="/signup">Sign up</StyledFooterLink>
          </StyledFooterText>
        </Card>
      </ResetPasswordContainer>
      <Footer />
    </>
  );
}

const ResetPasswordContainer = styled.div`
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
    width: 330px;
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
  min-height: 530px;
  max-height: 600px;
  padding: 1.5rem;
  border-radius: 10px;
  @media (max-width: 767px) {
    max-width: 89%;
    padding: 1.5rem 1.1rem;
  }
`;
const CardHeader = styled.div`
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoxHeaderText = styled.p`
  margin-bottom: 23px;
  line-height: 1.4;
`;

const StyledFooterText = styled.p`
  color: black;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
`;
const StyledFooter2 = styled.p`
  font-size: 0.9rem;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
`;
const StyledFooterLink = styled(Link)`
  color: #ed4a2f;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
const StyledLink2 = styled(Link)`
  color: #ed4a2f;
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
export default ResetPassword;

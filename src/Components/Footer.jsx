import { PawPrint } from "lucide-react";
import { NavLink } from "react-router-dom";
import { scroller } from "react-scroll";
import styled from "styled-components";

function Footer() {
  const handleScrollToFeatures = () => {
    scroller.scrollTo("features", {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const handleScrollToHiw = () => {
    scroller.scrollTo("howitworks", {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <FooterContainer>
      <BoxContainer>
        <Box>
          <LogoLink to="/">
            <LogoDiv>
              <PawPrint color="#ed4a2f" fill="#ed4a2f" />
              <Logo>PetMuse</Logo>
            </LogoDiv>
          </LogoLink>
          <BoxText>
            The all-in-one pet care planner to manage health logs, appointments,
            tasks, and notes for all your furry friends.
          </BoxText>
        </Box>
        <Box>
          <BoxTextOne>Quick Links</BoxTextOne>
          <BoxMenu>
            <BoxItem onClick={handleScrollToFeatures}>
              <StyledLink to="/#features">Features</StyledLink>
            </BoxItem>
            <BoxItem onClick={handleScrollToHiw}>
              <StyledLink to="/#howitworks">How It Works</StyledLink>
            </BoxItem>
          </BoxMenu>
        </Box>
        <Box>
          <BoxTextOne>Legal</BoxTextOne>
          <BoxMenu>
            <BoxItem>
              <StyledLink to="/privacy">Privacy Policy</StyledLink>
            </BoxItem>
            <BoxItem>
              <StyledLink to="/terms">Terms of Service</StyledLink>
            </BoxItem>
          </BoxMenu>
        </Box>
        <Box>
          <BoxTextOneContact>Contact</BoxTextOneContact>
          <BoxTextTwo>
            <EmailLink href="mailto:reactdev@reactdev.site">
              reactdev@reactdev.site
            </EmailLink>
          </BoxTextTwo>
        </Box>
      </BoxContainer>
      <CopyRight>
        <FooterText>
          &copy; {new Date().getFullYear()} PetMuse. All rights reserved.
        </FooterText>
      </CopyRight>
    </FooterContainer>
  );
}
const FooterContainer = styled.div`
  height: 200px;
  max-width: 1350px;
  margin: 0 auto;
  padding-top: 30px;
  @media (max-width: 1024px) {
    max-width: 91%;
  }
  @media (max-width: 767px) {
    max-width: 91%;
  }
`;
const Box = styled.div`
  width: 25%;
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const CopyRight = styled.div`
  border-top: 1px solid#ed4a2f;
  margin-top: 30px;
  padding-top: 12px;
  height: 50px;
`;
const FooterText = styled.p`
  text-align: center;
  color: #ed4a2f;
  font-size: 0.9rem;
`;
const BoxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
const BoxText = styled.p`
  margin-top: 6px;
  font-size: 1rem;
  @media (max-width: 1024px) {
    width: 400px;
  }
  @media (max-width: 767px) {
    width: 310px;
    font-size: 0.9rem;
  }
`;
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 767px) {
  }
`;
const Logo = styled.p`
  font-size: 1.2rem;
  color: #ed4a2f;
`;
const BoxTextOne = styled.p`
  color: #ed4a2f;
  font-size: 1.1rem;
  @media (max-width: 767px) {
    width: 200px;
  }
`;
const BoxTextOneContact = styled.p`
  font-size: 1.1rem;
  padding-bottom: 8px;
  color: #ed4a2f;
  @media (max-width: 767px) {
    padding-bottom: 2px;
  }
`;
const BoxTextTwo = styled.p`
  font-size: 1rem;
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;
const BoxMenu = styled.ul`
  list-style: none;
  margin-top: 9px;
  @media (max-width: 767px) {
    margin-top: 4px;
  }
`;
const BoxItem = styled.li`
  margin-top: 5px;
  font-size: 1rem;
  width: fit-content;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateX(10px);
  }
  @media (max-width: 767px) {
    width: 200px;
    margin-top: 2px;
    font-size: 0.9rem;
  }
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #ed4a2f;
  }
`;

const EmailLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    color: #ed4a2f;
  }
`;
const LogoLink = styled(NavLink)`
  text-decoration: none;
  color: #ed4a2f;
`;
export default Footer;

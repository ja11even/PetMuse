import { PawPrint } from "lucide-react";
import styled from "styled-components";
import ScrollProgressBar from "./ScrollProgressBar";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ProgressNavbar() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScroll]);
  return (
    <Nav scroll={scroll}>
      <NavContainer>
        <LogoLink to="/">
          <LogoDiv>
            <PawPrint fill="#ed4a2f" />
            <Logo>PetMuse</Logo>
          </LogoDiv>
        </LogoLink>
        <Button></Button>
      </NavContainer>
      <ScrollProgressBar />
    </Nav>
  );
}

const Nav = styled.nav`
  top: 0;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 59px;
  padding: 0.6rem;
  color: #ed4a2f;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  background-color: ${({ scroll }) => (scroll ? "rgba(0,0,0,0,0)" : "#ffffff")};
  backdrop-filter: ${({ scroll }) => (scroll ? "blur(6px)" : "none")};
`;
const NavContainer = styled.div`
  max-width: 1350px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  color: #ed4a2f;
  @media (max-width: 767px) {
    max-width: 95%;
  }
`;
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 4px;
`;
const Logo = styled.p`
  font-size: 1.2rem;
`;

const Button = styled.div`
  display: flex;
  gap: 0.7rem;
`;
const LogoLink = styled(NavLink)`
  text-decoration: none;
  color: #ed4a2f;
`;
export default ProgressNavbar;

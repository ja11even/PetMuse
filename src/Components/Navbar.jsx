import { AlignJustify, PawPrint, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ScrollProgressBar from "./ScrollProgressBar";
import { Link, scroller } from "react-scroll";
import { Link as DomLink } from "react-router-dom";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScroll]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  const scrollFeatures = () => {
    setOpen(false);
    setTimeout(() => {
      scroller.scrollTo("features", {
        smooth: true,
        duration: 500,
      });
    }, 300);
  };
  const scrollHIW = () => {
    setOpen(false);
    setTimeout(() => {
      scroller.scrollTo("howitworks", {
        smooth: true,
        duration: 500,
      });
    }, 300);
  };
  return (
    <Nav scroll={scroll}>
      <NavContainer>
        <LogoLink to="/">
          <LogoDiv>
            <PawPrint fill="#ed4a2f" />
            <Logo>PetMuse</Logo>
          </LogoDiv>
        </LogoLink>
        <NavMenu>
          <Link to="features" smooth={true} duration={500}>
            <NavItem>Features</NavItem>
          </Link>
          <Link to="howitworks" smooth={true} duration={500}>
            <NavItem>How It Works</NavItem>
          </Link>
          <NavItemLink to="/contact">
            <NavItem>Contact</NavItem>
          </NavItemLink>
        </NavMenu>
        <HamburgerDiv>
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <XIcon
                key="x-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
              >
                <X />
              </XIcon>
            ) : (
              <HamburgerIcon
                key="hamburger-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(true)}
              >
                <AlignJustify />
              </HamburgerIcon>
            )}
            {open && (
              <Overlay
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                  ease: easeInOut,
                }}
              >
                <ButtonLink to="/login">
                  <MobileLogIn>Log In</MobileLogIn>
                </ButtonLink>
                <ButtonLink to="/signup">
                  <MobileSignUp>Sign Up</MobileSignUp>
                </ButtonLink>
                <MobileNavMenu>
                  <Link onClick={scrollFeatures}>
                    <MobileNavItem>Features</MobileNavItem>
                  </Link>
                  <Link onClick={scrollHIW}>
                    <MobileNavItem>How It Works</MobileNavItem>
                  </Link>
                  <NavItemLink to="/contact">
                    <MobileNavItem>Contact</MobileNavItem>
                  </NavItemLink>
                </MobileNavMenu>
              </Overlay>
            )}
          </AnimatePresence>
        </HamburgerDiv>
        <Buttons>
          <ButtonLink to="/login">
            <LogIn>Log In</LogIn>
          </ButtonLink>
          <ButtonLink to="/signup">
            <SignUp>Sign Up</SignUp>
          </ButtonLink>
        </Buttons>
      </NavContainer>
    </Nav>
  );
}

const Nav = styled.nav`
  top: 0;
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 59px;
  padding: 0.6rem;
  color: #ed4a2f;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  background-color: ${({ scroll }) => (scroll ? "rgba(0,0,0,0,0)" : "#ffffff")};
  backdrop-filter: ${({ scroll }) => (scroll ? "blur(6px)" : "none")};
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const NavContainer = styled.div`
  max-width: 1350px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  color: #ed4a2f;
  @media (max-width: 1024px) {
    max-width: 95%;
  }
  @media (max-width: 767px) {
    max-width: 95%;
  }
`;
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 1024px) {
    margin-top: 4px;
  }
  @media (max-width: 767px) {
    margin-top: 4px;
  }
`;
const Logo = styled.p`
  font-size: 1.2rem;
`;
const NavMenu = styled.ul`
  display: flex;
  gap: 3rem;
  list-style: none;
  margin-left: 50px;
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const MobileNavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-top: 30px;
`;
const MobileNavItem = styled.li`
  @media (max-width: 1024px) {
    width: 300px;
  }
  font-size: 1.1rem;
  border-bottom: 1px solid #ed4a2f;
  width: 340px;
  margin-top: 20px;
  padding-bottom: 10px;
`;
const HamburgerDiv = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    justify-content: center;
    margin-top: 7px;
  }
  @media (max-width: 767px) {
    display: block;
    justify-content: center;
    margin-top: 7px;
  }
`;
const NavItem = styled.li`
  &:hover {
    cursor: pointer;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 0.7rem;
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const SignUp = styled.button`
  border: none;
  background-color: #ed4a2f;
  padding: 0.58rem 0.5rem;
  font-size: 1rem;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  font-family: inherit;
  width: 80px;

  &:hover {
    cursor: pointer;
  }
`;
const LogIn = styled.button`
  border: none;
  border: 1px solid #ed4a2f;
  background-color: transparent;
  padding: 0.5rem 0.5rem;
  width: 80px;
  font-size: 1rem;
  border-radius: 5px;
  font-family: inherit;
  color: #ed4a2f;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
`;
const MobileLogIn = styled.button`
  @media (max-width: 1024px) {
    width: 300px;
  }
  border: none;
  border: 1px solid #ed4a2f;
  background-color: transparent;
  padding: 0.9rem;
  width: 340px;
  font-size: 1.1rem;
  border-radius: 5px;
  font-family: inherit;
  color: #ed4a2f;
  margin-top: 30px;
`;
const MobileSignUp = styled.button`
  @media (max-width: 1024px) {
    width: 300px;
  }
  border: none;
  background-color: #ed4a2f;
  padding: 0.9rem;
  font-size: 1.1rem;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  font-family: inherit;
  width: 340px;
  margin-top: 20px;
`;
const NavItemLink = styled(NavLink)`
  text-decoration: none;
  color: #ed4a2f;
`;
const LogoLink = styled(NavLink)`
  text-decoration: none;
  color: #ed4a2f;
`;
const ButtonLink = styled(DomLink)`
  text-decoration: none;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 59px;
  left: 0;
  width: 100%;
  height: calc(100vh - 59px);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 998;
  color: #ed4a2f;

  transform-origin: top;
`;
const HamburgerIcon = styled(motion.div)``;
const XIcon = styled(motion.div)``;
export default Navbar;

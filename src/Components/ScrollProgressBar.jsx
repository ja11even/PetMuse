import { useEffect, useState } from "react";
import styled from "styled-components";

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <BarWrapper>
      <Progress width={scrollProgress} />
    </BarWrapper>
  );
}

const BarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: transparent;
  z-index: 50;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #ed4a2f;
  width: ${({ width }) => width}%;
  transition: width 0.3s ease-out;
`;
export default ScrollProgressBar;

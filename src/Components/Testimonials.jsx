import styled from "styled-components";
import { Heading } from "./Heading";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import pet6 from "../assets/pettest6.jpg";
import pet3 from "../assets/pettest3.jpg";
import pet5 from "../assets/pettest5.jpg";
import pet1 from "../assets/pettest1.jpg";
import pet7 from "../assets/pettest7.jpg";
const TestimonialData = [
  {
    text: "\"Keeping track of my baby's meds used to be a mess. This app makes it so easy. It's made a huge difference in my routine\"",
    avatar: pet6,
    name: "Rosemary & Whiskers 🐱 ",
  },
  {
    text: '"I never forget grooming appointments anymore. The reminders feature is a lifesaver for my busy schedule"',
    avatar: pet3,
    name: "Ngozi & Kai 🐶",
  },
  {
    text: '"Before this app, I kept everything in random notes. Now I actually stay on top of feeding schedules and meds"',
    avatar: pet5,
    name: "John & Max 🐶",
  },
  {
    text: '"This app makes keeping track of my dogs meds so easy"',
    avatar: pet1,
    name: "Maya & Bella 🐶",
  },
  {
    text: '"I manage two cats with special needs. This app helps me stay organized without stress"',
    avatar: pet7,
    name: "Sarah & Porsha 🐱",
  },
];
function Testimonials() {
  const headerRef = useRef(null);
  const isheaderRefInView = useInView(headerRef, { once: true });
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % TestimonialData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const { avatar, text, name } = TestimonialData[index];
  return (
    <TestimonialContainer>
      <ContainerOne
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={
          isheaderRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Heading as="h2">What Pet Parents Say</Heading>
        <HeaderText>
          Join thousands of happy pet owners using PetMuse
        </HeaderText>
      </ContainerOne>
      <TestimonialBoxContainer>
        <AnimatePresence mode="wait">
          <TestimonialBox
            key={index}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Text>{text}</Text>
            <Avatar src={avatar} />
            <Name>{name}</Name>
          </TestimonialBox>
        </AnimatePresence>
      </TestimonialBoxContainer>
    </TestimonialContainer>
  );
}
const TestimonialContainer = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  height: 520px;
  @media (max-width: 767px) {
    height: 600px;
  }
`;
const ContainerOne = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: 1350px;
  margin: 0 auto;
  align-items: center;
  padding-top: 50px;
  line-height: 1.4;
  @media (max-width: 767px) {
    text-align: center;
  }
`;
const HeaderText = styled.p`
  font-size: 1.3rem;
  @media (max-width: 767px) {
    max-width: 300px;
    font-size: 1.15rem;
  }
`;
const TestimonialBoxContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  @media (max-width: 767px) {
    margin-top: 20px;
  }
`;
const TestimonialBox = styled(motion.div)`
  position: absolute;
  background: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  @media (max-width: 767px) {
    width: 89%;
    padding: 1.5rem 1rem;
  }
`;
const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 999px;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const Name = styled.p`
  font-size: 1.1rem;
  margin: 0.25rem 0 0;
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #ed4a2f;
  margin-bottom: 1rem;
`;

export default Testimonials;

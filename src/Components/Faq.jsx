import styled from "styled-components";
import { Heading } from "./Heading";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "How many pets can I add to my account?",
    answer:
      "You can add unlimited pets to your PetMuse account. Each pet gets their own profile.",
  },
  {
    question: "Is my pet's data secure?",
    answer:
      "Yes, all your pet's information is stored securely. We will share your data without your permission.",
  },
  {
    question: "Can I access PetMuse across devices?",
    answer:
      "Your data is synced in real time, so updates will instantly be available on all your devices.",
  },
  {
    question: "Is there a cost to use PetMuse?",
    answer: "PetMuse is completely free to use for all pet lovers.",
  },
];
function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <FaqContainer>
      <ContainerOne>
        <Heading as="h2">Frequently Asked Questions</Heading>
        <HeaderText>Everything you need to know about PetMuse</HeaderText>
      </ContainerOne>
      <AccordionContainer>
        {faqData.map((item, index) => (
          <AccordionItem key={index}>
            <Question onClick={() => toggle(index)}>
              {item.question}
              <Icon>
                {activeIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </Icon>
            </Question>
            {activeIndex === index && <Answer>{item.answer}</Answer>}
          </AccordionItem>
        ))}
      </AccordionContainer>
    </FaqContainer>
  );
}

const FaqContainer = styled.div`
  background-color: #ffffff;
  min-height: 560px;
  @media (max-width: 767px) {
    min-height: 600px;
    max-height: 650px;
  }
`;
const ContainerOne = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  line-height: 1.4;
  @media (max-width: 767px) {
    max-width: 500px;
    text-align: center;
  }
`;
const HeaderText = styled.p`
  font-size: 1.3rem;
  @media (max-width: 767px) {
    max-width: 300px;
    font-size: 1.25rem;
  }
`;
const AccordionContainer = styled.div`
  max-width: 650px;
  margin: 50px auto;
  @media (max-width: 767px) {
    margin: 30px auto;
    max-width: 88%;
  }
`;
const AccordionItem = styled.div`
  border-bottom: 1px solid #ed4a2f;
  padding: 10px 0;
`;
const Question = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  font-size: 1.2rem;
  color: #ed4a2f;
  justify-content: space-between;
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;
const Answer = styled.div`
  font-size: 0.9rem;
`;
const Icon = styled.p`
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;
export default Faq;

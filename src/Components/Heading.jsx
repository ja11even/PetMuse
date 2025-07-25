import styled, { css } from "styled-components";

export const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      color: #ed4a2f;
      line-height: 3.7rem;
      font-family: "MyFont";
      font-weight: 500;
      width: 650px;
      @media (max-width: 767px) {
        width: 330px;
        font-size: 2.8rem;
      }
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      color: #ed4a2f;
      font-family: "MyFont";
      font-weight: 500;
      @media (max-width: 767px) {
        font-size: 2rem;
        max-width: 350px;
      }
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.4rem;
      color: #ed4a2f;
      font-family: "MyFont";
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.6rem;
      color: #ed4a2f;
      font-family: "MyFont";
      font-weight: 500;
      @media (max-width: 767px) {
        font-size: 1.4rem;
      }
    `}
    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 1.9rem;
      color: #ed4a2f;
      font-family: "MyFont";
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h6" &&
    css`
      font-size: 1.5rem;
      color: #ed4a2f;
      font-family: "MyFont";
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h7" &&
    css`
      font-size: 1.2rem;
      color: #ed4a2f;
      font-family: "MyFont";
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h8" &&
    css`
      font-size: 1.4rem;
      color: #99a1af;
      font-weight: 300;
    `}
    ${(props) =>
    props.as === "h9" &&
    css`
      font-size: 1.2rem;
      color: #ed4a2f;
      font-weight: 500;
      @media (max-width: 767px) {
        font-size: 1.1rem;
      }
    `}
    ${(props) =>
    props.as === "h10" &&
    css`
      font-size: 1.2rem;
      color: black;
      font-weight: 300;
    `}
    ${(props) =>
    props.as === "h11" &&
    css`
      font-size: 1.6rem;
      color: black;
      font-family: "MyFont";
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h12" &&
    css`
      font-size: 1.2rem;
      color: black;
      font-weight: 300;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `}
`;

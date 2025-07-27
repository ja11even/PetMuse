import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    background-color:#FCE9D0 ;
    line-height: 1.6;
    font-family: 'MyFont', sans-serif;
    overscroll-behavior: none;
    height: 100%;
}
.react-calendar{
    font-family: "MyFont", sans-serif;
}
html{
    scrollbar-width: none;
    -ms-overflow-style: none;
}

body::-webkit-scrollbar{
    display: none;
}

.ReactModal__Overlay {
  background-color: rgba(0, 0, 0, 0.7) !important;
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  padding-top: 100px;
}

.ReactModal__Content {
  position: static !important;
  inset: auto !important;
  padding: 0 !important;
  border: none;
  background: none;
  max-width: 100%;
  width: auto;
}

`;

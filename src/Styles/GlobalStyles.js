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
`;

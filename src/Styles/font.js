import NeutralSansWoff2 from "../assets/fonts/NeutralSans-Regular.woff2";
import NeutralSansWoff from "../assets/fonts/NeutralSans-Regular.woff";
import { createGlobalStyle } from "styled-components";

export const FontStyles = createGlobalStyle`
@font-face {
    font-family: 'MyFont';
    src: url(${NeutralSansWoff2}) format('woff2'),
    url(${NeutralSansWoff}) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: block;
}
`;

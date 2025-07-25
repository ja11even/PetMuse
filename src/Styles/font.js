import NeutralSansWoff2 from "../assets/fonts/NeutralSans-Regular.woff2";
import NeutralSansWoff from "../assets/fonts/NeutralSans-Regular.woff";
import NeutralSansBold from "../assets/fonts/NeutralSans-Bold-BF673417d49d91f.otf";
import NeutralSansMedium from "../assets/fonts/NeutralSans-Meidum-BF673417d4df1bc.otf";
import { createGlobalStyle } from "styled-components";

export const FontStyles = createGlobalStyle`
        @font-face {
            font-family: 'MyFont';
            src: url(${NeutralSansWoff2}) format('woff2'),
            url(${NeutralSansWoff}) format('woff');
            font-weight: 400;
            font-style: normal;
            font-display: block;
        
        }
        @font-face {
        font-family: 'MyFont';
        src: url(${NeutralSansMedium}) format('opentype');
        font-weight:500;
        font-style:normal;
        font-display:block
    }
    @font-face {
        font-family: 'MyFont';
        src: url(${NeutralSansBold}) format('opentype');
        font-weight:600;
        font-style:normal;
        font-display:block
    }
`;

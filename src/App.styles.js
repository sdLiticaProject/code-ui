import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html,
  body {
    font-family: 'Roboto', sans-serif;;
  }

  ,
  #root,
  #root > div {
    height: 100%;
    border: 2px solid red;
  }`;

export default GlobalStyle;

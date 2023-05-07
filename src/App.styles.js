import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body {
  font-family: 'Roboto', sans-serif;;
},
#root,
#root > div {
  height: 100%;
}`;

export default GlobalStyle;

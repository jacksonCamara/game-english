// Corrigi a formatação dentro de createGlobalStyle
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    background-color: ${() => theme.colors.background};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

// Corrigi a formatação dentro de createGlobalStyle
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    /* font-family: "Roboto", sans-serif; */
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    background-color: ${() => theme.colors.background};
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

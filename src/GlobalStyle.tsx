import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Inter;
    font-size: ${({ theme }) => theme.spacing[400]};
    margin: 0;
    background: ${({ theme }) => theme.color.grey[100]};
  }

  * {
    box-sizing: border-box;
  }
`;

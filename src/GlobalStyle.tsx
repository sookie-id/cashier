import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Inter;
    margin: ${({ theme }) => theme.spacing[500]};
    padding: 0;
    background: ${({ theme }) => theme.color.grey[100]};
  }

  * {
    box-sizing: border-box;
  }
`;

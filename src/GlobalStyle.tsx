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

  nav {
    background: white;
    display: flex;
    height: ${({ theme }) => theme.spacing[700]};
    gap: ${({ theme }) => theme.spacing[600]};
    margin-bottom: ${({ theme }) => theme.spacing[400]};
    justify-content: center;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    a {
      display: flex;
      height: 100%;
      align-items: center;
      text-decoration: none;
      color: ${({ theme }) => theme.color.grey[700]};
    }

    a.active {
      color: ${({ theme }) => theme.color.primary1[600]};
      border-bottom: ${({ theme }) =>
        theme.spacing[100] + " solid " + theme.color.primary1[700]};
    }
  }
`;

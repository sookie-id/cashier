import styled from "styled-components";

  export const Nav = styled.nav`
    background: white;
    display: flex;
    height: ${({ theme }) => theme.spacing[700]};
    gap: ${({ theme }) => theme.spacing[500]};
    margin-bottom: ${({ theme }) => theme.spacing[400]};
    justify-content: center;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    a {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: ${({ theme }) => theme.color.grey[700]};
      width: ${({theme}) => theme.spacing[900]};
    }

    a.active {
      color: ${({ theme }) => theme.color.primary1[600]};
      border-bottom: ${({ theme }) =>
        theme.spacing[100] + " solid " + theme.color.primary1[700]};
    }
  `
import styled from "styled-components";
import Input from "./Input";

export const StyledInput = styled(Input)`
    width: fit-content;
`

export const P = styled.p`
    margin: 0;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.color.primary1[700]};
    }
`
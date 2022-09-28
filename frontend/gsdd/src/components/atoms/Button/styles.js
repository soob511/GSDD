import styled, { css } from "styled-components";

export const RoundButton = styled.button`
    background : ${({ theme }) => css`${theme.colors['blue']}`};
    border-radius: 50%;
    margin-bottom: 10px;
    margin-right: 10px;
    width : 50px;
    height: 50px;
    ${(props) => props.active &&
        css`
        background: ${({ theme }) => css`${theme.colors['grayblue']}`};
    `}
`

export const Login = styled.div`
    width: 320px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
${(props) => props.kakao &&
        css`
        color: #3e2723;
        background: #ffeb3b;
        border: 1px solid #ffeb3b;
    `}

${(props) => props.naver &&
        css`
        color: white;
        background: #00bf19;
        border: 1px solid #00bf19;
    `}

${(props) => props.google &&
        css`
        border: 1px solid #d9d9d9;
    `}
`;

export const X = styled.button`
    width: 20px;
    height: 20px;
    padding: 20px;
    border: none;
    background-color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    color: ${({theme}) => css`
        ${theme.colors['gray2']}
    `}
`
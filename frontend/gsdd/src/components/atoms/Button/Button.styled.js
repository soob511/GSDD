import styled, { css } from "styled-components";

export const ChangeBg = styled.div`
    background : red;
    width : 500px;
    height: 500px;
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

import styled, { css } from 'styled-components';

export const Box = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: '3%',
    boxShadow: 24,
    p: 6,
};

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Button = styled.button`
    border-radius: 100%;
    width: 50px;
    height: 50px;
    border: none;
    background-color: ${({ theme }) =>
        css`
          ${theme.colors['gray3']}
        `};
    ${(props) => props.mute && css `
        background-color: ${({ theme }) =>
        css`
          ${theme.colors['gray2']}
        `};
    ` }
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Span = styled.span`
    font-size: 18px;
    font-family: SUIT-Heavy;

`
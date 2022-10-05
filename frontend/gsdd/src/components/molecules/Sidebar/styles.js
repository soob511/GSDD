import styled, { css } from 'styled-components';

export const Item = styled.li`
  cursor: pointer;
  padding: 24px 0 24px 40px;
  margin-bottom: 8px;
  ${(props) =>
    props.button &&
    css`
      display: flex;
      justify-content: end;
      padding: 10px 10px 0 0;
      margin-bottom: 0;
    `}
`;
export const Button = styled.a``;
export const List = styled.ul`
  list-style: none;
  justify-content: center;
  padding: 0;
  ${(props) =>
    props.bottom &&
    css`
      margin-top: 240px;
    `}
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  position: fixed;
  background-color: white;
  transition: 0.4s ease;
  z-index: 99;
`;

export const Div = styled.div`
  color: ${({ theme }) =>
    css`
      ${theme.colors['blue']}
    `};
  font-size: 1.2rem;
`;

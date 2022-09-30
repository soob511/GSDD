import styled, { css } from 'styled-components';

const flexColumn = css`
  ${({ theme }) => css`
    ${theme.flex.columnCenter}
  `}
`;
export const Text = styled.div`
  ${flexColumn}
  width: 100%;
  margin-bottom: '1.5rem';
`;
export const Login = styled.div`
  ${flexColumn}
  width: 100%;
  height: 100%;
  margin-bottom: '1.5rem';
  //   margin-top: 100px;
  background: white;
`;
export const BtnLogo = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 20px;
`;

export const BtnText = styled.div`
  width: 100%;
  text-align: center;
  padding-right: 16px;
`;

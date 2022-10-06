import styled, { css } from 'styled-components';

const flex1 = css`
  ${({ theme }) => css`
    ${theme.flex.rowCenter}
  `}
`;

const flex2 = css`
  ${({ theme }) => css`
    ${theme.flex.columnCenter}
  `}
`;

export const MainCardContainer = styled.div`
  ${flex1}
  margin-top: -30px;
`;

export const CardWrapper = styled.div`
  ${flex2}
  width: 45%;
  height: 4rem;
  background: ${({ theme }) =>
    css`
      ${theme.colors['blue']}
    `};
  color: white;
  font-family: DalseoHealingBold;
`;

export const Count = styled.div`
  //   color: white;
`;

export const Space = styled.div`
  height: 100%;
  width: 3px;
`;

export const FontSize = styled.div`
  font-size: 1.5rem;
  font-family: SUIT-Light;
`;

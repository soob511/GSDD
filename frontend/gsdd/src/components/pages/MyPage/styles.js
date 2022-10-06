import styled, { css } from 'styled-components';

const flex = css`
  ${({ theme }) => css`
    ${theme.flex.rowCenter}
  `}
`;

export const ArticleCard = styled.div`
  ${flex}
  width: 100%;
  height: 10rem;
  background: white;
  font-weight: bold;
  font-size: 20px;
`;

export const MapWrapper = styled.div`
  bottom:0;
  overflow: visible;
`;

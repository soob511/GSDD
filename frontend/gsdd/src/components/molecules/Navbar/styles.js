import styled, { css } from 'styled-components';

// const flexRow = css`
//   ${({ theme }) => css`
//     ${theme.flex.rowCenter}
//   `}
// `;

// const flexColumn = css`
//   ${({ theme }) => css`
//     ${theme.flex.columnCenter}
//   `}
// `;

export const StyledNavbar = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) =>
    css`
      ${theme.colors['blue']}
    `};
  padding: 2rem 0.5rem 2rem 0.5rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
  height: 3.5rem;
  position: fixed;
  top: 0;
`;

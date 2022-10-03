import styled, { css } from 'styled-components';

const flexRow = css`
  ${({ theme }) => css`
    ${theme.flex.rowCenter}
  `}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '5%',
  boxShadow: 24,
  p: 6,
};

export const PlusBtn = styled.button`
  ${flexRow}
  border: none;
  font-size: 1.5rem;
  background: white;
  width: 100%;
  border-radius: 10px;
  height: 10%;
`;

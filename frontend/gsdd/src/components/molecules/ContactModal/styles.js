import styled, { css } from 'styled-components';

const flexRow = css`
  ${({ theme }) => css`
    ${theme.flex.rowCenter}
  `}
`;
export const PlusBtn = styled.button`
  ${flexRow}
  border: none;
  font-size: 1.5rem;
  background: white;
  width: 100%;
  border-radius: 10px;
  height: 10%;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: '60%',
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 6,
};

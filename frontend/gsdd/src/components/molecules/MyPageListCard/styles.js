import styled, { css } from 'styled-components';

const flexRow = css`
  ${({ theme }) => css`
    ${theme.flex.rowCenter}
  `}
`;

export const Container = styled.div`
  width: 80%;
  height: 50%;
  margin-top: 11%;
  margin-left: 10%;
`;

export const Label = styled.span`
  font-size: 1.5rem;
`;

export const ListCard = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3%;
  border-radius: 10px;
  background: white;
`;

export const TitleWrapper = styled.div`
  display: flex;
  //   background: red;
  justify-content: space-around;
  padding: 10px 0;
  &: first-child {
    margin-right: 50px;
  }
`;

export const MainTitle = styled.span`
  //   background: red;
`;

export const SubTitle = styled.span`
  //   background: blue;
`;

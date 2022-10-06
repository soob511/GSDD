import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';

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
  position: relative;
`;

export const Label = styled.span`
  font-size: 1.5rem;
  font-family: DalseoHealingBold;
`;

export const ListCard = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3%;
  border-radius: 10px;
  background: white;
  overflow: auto;
  font-family: SUIT-Light;
`;

export const TitleWrapper = styled.div`
  ${flexRow}
  width: 80%;
  justify-content: space-around;
  padding: 15px 0;
  background: white;

  margin-left: 10%;
  margin-bottom: ${prop('margin', 0)};
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

export const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 11%;
  margin: 1% 0;
  border-radius: 10px;
  background: white;
`;

export const Line = styled.hr`
  width: 80%;
  height: 1px;
  background-color: ${({theme}) => css`
    ${theme.colors['gray2']}
  `};
  margin: 0 0 0 10%;
`;

export const AddressWrapper = styled.div`
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const SpanWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  font-family: SUIT-Light;
  font-weight: bold;
  margin-left: 5%;
`;

export const Error = styled.div`
  ${flexRow}
  width: 100%;
  height: 40%;
`;

export const NickNameWrapper = styled.div`
  width: 25%;
`;

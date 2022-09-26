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
`;

export const ListCard = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3%;
  border-radius: 10px;
  background: white;
  overflow: auto;
  position: absolute;
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
  position: fixed;
  width: 80%;
  border-radius: 10px;
  height: 5%;
  bottom: 80px;
`;

export const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 6%;
  position: fixed;
  border-radius: 10px;
  background: white;
`;

export const Line = styled.hr`
  width: 70%;
  position: fixed;
  margin: 0 0 0 5%;
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
  margin-left: 30px;
`;

export const Error = styled.div`
  ${flexRow}
  width: 100%;
  height: 40%;
`;

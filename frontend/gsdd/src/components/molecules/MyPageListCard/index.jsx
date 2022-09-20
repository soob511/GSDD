import React from 'react';
import * as S from './styles';

const MyPageListCard = ({ type }) => {
  const nameDatas = {
    names: [
      {
        id: 1,
        name: '허혜진',
        number: '010-1234-5678',
      },
      {
        id: 2,
        name: '어정윤',
        number: '010-1234-5678',
      },
      {
        id: 3,
        name: '전수빈',
        number: '010-1234-5678',
      },
      {
        id: 4,
        name: '김주은',
        number: '010-1234-5678',
      },
    ],
  };

  const { names } = nameDatas;
  return (
    <>
      <S.Container>
        <S.Label>{type}</S.Label>
        <S.ListCard>
          <S.TitleWrapper>
            <S.MainTitle>{type === '비상연락망' ? '이름' : '목적지'}</S.MainTitle>
            <S.SubTitle>{type === '비상연락망' ? '전화번호' : '주소'}</S.SubTitle>
          </S.TitleWrapper>
          <hr
            style={{
              margin: '0 0 0 5%',
              width: '90%',
            }}
          />
          {names.map((n) => (
            <S.TitleWrapper>
              <S.MainTitle key={n.id}>{n.name}</S.MainTitle>
              <S.SubTitle key={n.id}>{n.number}</S.SubTitle>
            </S.TitleWrapper>
          ))}
        </S.ListCard>
      </S.Container>
    </>
  );
};

export default MyPageListCard;

import React, { useState } from 'react';
import * as S from './styles';
import MyPageListCard from '../MyPageListCard';

const MypageCard = () => {
  const [type, setType] = useState('비상연락망');

  const clickedNumbers = () => {
    setType('비상연락망');
    console.log(type);
  };

  const clickedDestinations = () => {
    setType('즐겨찾는 목적지');
    console.log(type);
  };
  return (
    <>
      <S.MainCardContainer>
        <S.CardWrapper onClick={clickedNumbers}>
          비상연락망
          <div>5</div>
        </S.CardWrapper>
        <S.Space />
        <S.CardWrapper onClick={clickedDestinations}>
          즐겨찾는 목적지
          <div>3</div>
        </S.CardWrapper>
      </S.MainCardContainer>
      <MyPageListCard type={type} />
    </>
  );
};

export default MypageCard;

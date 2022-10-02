import React, { useState } from 'react';
import * as S from './styles';
import MyPageListCard from '../MyPageListCard';
import { useSelector } from 'react-redux';

const MypageCard = () => {
  const [type, setType] = useState('비상연락망');

  const routes = useSelector((state) => state.userReducer.routes);
  const contacts = useSelector((state) => state.userReducer.contacts);

  const clickedNumbers = () => {
    setType('비상연락망');
  };

  const clickedDestinations = () => {
    setType('즐겨찾는 목적지');
  };
  return (
    <>
      <S.MainCardContainer>
        <S.CardWrapper onClick={clickedNumbers}>
          비상연락망
          <S.FontSize>{contacts.length}</S.FontSize>
        </S.CardWrapper>
        <S.Space />
        <S.CardWrapper onClick={clickedDestinations}>
          즐겨찾는 목적지
          <S.FontSize> {routes.length}</S.FontSize>
        </S.CardWrapper>
      </S.MainCardContainer>
      <MyPageListCard type={type} />
    </>
  );
};

export default MypageCard;

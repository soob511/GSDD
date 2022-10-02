import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ContactModal from '../ContactModal';

const MyPageListCard = ({ type }) => {
  const userData = useSelector((state) => state.userReducer);

  const deleteClick = () => {
    console.log('clicked');
  };

  const tags = (data, margin) => {
    if (type === '비상연락망') {
      return (
        <S.TitleWrapper key={data.id} margin={margin}>
          <span>{data.name}</span>
          <span>{data.contact}</span>
          <div onClick={deleteClick}>
            <AiFillMinusCircle color="red" />
          </div>
        </S.TitleWrapper>
      );
    } else if (type !== '비상연락망') {
      return (
        <S.TitleWrapper key={data.id} margin={margin}>
          <span>{data.name}</span>
          <S.AddressWrapper>{data.address}</S.AddressWrapper>
          <div onClick={deleteClick}>
            <AiFillMinusCircle color="red" />
          </div>
        </S.TitleWrapper>
      );
    }
  };

  return (
    <>
      <S.Container>
        <S.Label>{type}</S.Label>
        <S.ListCard>
          <S.MainWrapper>
            <S.SpanWrapper>
              <span>{type === '비상연락망' ? '이름' : '목적지'}</span>
              <span>{type === '비상연락망' ? '전화번호' : '주소'}</span>
            </S.SpanWrapper>
          </S.MainWrapper>
          <S.Line />
          {userData !== null ? (
            type === '비상연락망' ? (
              userData.contacts.map((n) => (n.id === userData.contacts.length ? tags(n, '15px') : tags(n, 0)))
            ) : (
              userData.routes.map((d) => (d.id === userData.routes.length ? tags(d, '15px') : tags(d, 0)))
            )
          ) : (
            <S.Error>내용이 없습니다.</S.Error>
          )}
          {type === '비상연락망' ? <ContactModal type={type}></ContactModal> : <h3>주은이가 만든 모달 추가 예정</h3>}
        </S.ListCard>
      </S.Container>
    </>
  );
};

export default MyPageListCard;

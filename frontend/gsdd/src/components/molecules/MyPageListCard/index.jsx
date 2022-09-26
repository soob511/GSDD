import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { AiFillMinusCircle } from 'react-icons/ai';
import API from '../../../common/api';

const MyPageListCard = ({ type }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async (userId) => {
      await API.get(`mypage/${userId}`).then((response) => {
        setUserData(response.data);
      });
    };
    getUserData(1);
  }, []);

  const handleOpenModal = (modalType) => {
    if (modalType === '비상연락망') {
      console.log('비상연락망 모달');
    } else {
      console.log('즐겨찾는 목적지 모달');
    }
  };

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
          <div
            style={{
              height: '11%',
            }}
          ></div>
          <S.Line />
          {userData !== null ? (
            type === '비상연락망' ? (
              userData.contacts.map((n) => (n.id === userData.contacts.length ? tags(n, '20px') : tags(n, 0)))
            ) : (
              userData.routes.map((d) => (d.id === userData.routes.length ? tags(d, '20px') : tags(d, 0)))
            )
          ) : (
            <S.Error>내용이 없습니다.</S.Error>
          )}

          <S.PlusBtn onClick={() => handleOpenModal(type)}>+</S.PlusBtn>
        </S.ListCard>
      </S.Container>
    </>
  );
};

export default MyPageListCard;

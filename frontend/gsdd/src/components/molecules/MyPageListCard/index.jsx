import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { AiFillMinusCircle } from 'react-icons/ai';
import apiPath from '../../../api/apiPath';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../../reducers/userReducer';
import { authAxios } from '../../../api/common';

const MyPageListCard = ({ type }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getUserData = async (userId) => {
        await authAxios
          .get(apiPath.mypage.get(userId), {})
          .then((res) => {
            setUserData(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      };
      getUserData(1);
    } catch (e) {
      console.log(e);
    }
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

          <S.PlusBtn>+</S.PlusBtn>
          {/* <S.PlusBtn onClick={() => handleOpen(type)}>+</S.PlusBtn> */}
        </S.ListCard>
      </S.Container>
    </>
  );
};

export default MyPageListCard;

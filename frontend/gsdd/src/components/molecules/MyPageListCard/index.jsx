import React from 'react';
import * as S from './styles';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ContactModal from '../ContactModal';
import apiPath from '../../../api/apiPath';
import { authAxios } from '../../../api/common';
import RouteModal from '../RouteModal';

const MyPageListCard = ({ type }) => {
  const userData = useSelector((state) => state.userReducer);

  const handleContactDeleteClick = async (contactId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await authAxios
          .delete(apiPath.mypage.del(contactId))
          .then((res) => {
            console.log(res);
            console.log(contactId);
          })
          .catch((err) => console.log(err));
      } catch (e) {
        console.log(e);
      }
      window.location.href = '/mypage';
    } else {
      alert('취소되었습니다.');
    }
  };

  const handleRouteDeleteClick = async (routeId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await authAxios
          .delete(apiPath.mypage.routeDel(routeId))
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } catch (e) {
        console.log(e);
      }
      window.location.href = '/mypage';
    } else {
      alert('취소되었습니다.');
    }
  };

  const tags = (data, margin) => {
    if (type === '비상연락망') {
      return (
        <S.TitleWrapper key={data.id} margin={margin}>
          <span>{data.name}</span>
          <span>{data.contact}</span>
          <div onClick={() => handleContactDeleteClick(data.id)}>
            <AiFillMinusCircle color="red" />
          </div>
        </S.TitleWrapper>
      );
    } else if (type !== '비상연락망') {
      return (
        <S.TitleWrapper key={data.id} margin={margin}>
          <span>{data.name}</span>
          <S.AddressWrapper>{data.address}</S.AddressWrapper>
          <div onClick={() => handleRouteDeleteClick(data.id)}>
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
          {type === '비상연락망' ? <ContactModal type={type}></ContactModal> : <RouteModal />}
        </S.ListCard>
      </S.Container>
    </>
  );
};

export default MyPageListCard;

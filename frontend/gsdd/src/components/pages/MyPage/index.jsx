import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { FcLike } from 'react-icons/fc';
import MypageCard from '../../molecules/MypageCard';
import Navbar from '../../molecules/Navbar';
import API from '../../../common/api';

const MyPage = () => {
  const username = '싸피';

  // useEffect(() => {
  //   const getUserData = async (userId) => {
  //     const { data } = await API.get(`mypage/${userId}`);
  //     // setUserData(data);
  //     // console.log(data);
  //     return data;
  //   };
  //   // Redux 에서 userId 받아와서 넣을 예정
  //   const d = getUserData(1);
  //   setUserData(d);
  //   console.log(d);
  // }, []);

  // 여기서 axios 통신
  return (
    <>
      <Navbar />
      <S.ArticleCard>
        {username}님! 오늘도 안전길 다니세요
        <FcLike size="2rem" />
      </S.ArticleCard>
      <MypageCard />
    </>
  );
};

export default MyPage;

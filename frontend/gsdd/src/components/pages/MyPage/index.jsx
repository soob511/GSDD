import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { FcLike } from 'react-icons/fc';
import MypageCard from '../../molecules/MypageCard';
import Navbar from '../../molecules/Navbar';
import Sidebar from '../../molecules/Sidebar';
import { authAxios } from '../../../api/common';
import apiPath from '../../../api/apiPath';
import { useDispatch } from 'react-redux/es/exports';
import { SET_USER } from '../../../reducers/userReducer';

const MyPage = () => {
  const username = '싸피';
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getUserData = async (userId) => {
        await authAxios
          .get(apiPath.mypage.get(userId), {})
          .then((res) => {
            console.log(res.data);
            dispatch(SET_USER(res.data));
          })
          .catch((err) => console.log(err));
      };
      getUserData(4);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // 여기서 axios 통신
  return (
    <>
      <Sidebar />
      <S.ArticleCard>
        {username}님! 오늘도 안전길 다니세요
        <FcLike size="2rem" />
      </S.ArticleCard>
      <MypageCard />
    </>
  );
};

export default MyPage;

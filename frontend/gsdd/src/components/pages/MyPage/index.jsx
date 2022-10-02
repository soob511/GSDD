import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { FcLike } from 'react-icons/fc';
import MypageCard from '../../molecules/MypageCard';
import Navbar from '../../molecules/Navbar';
import Sidebar from '../../molecules/Sidebar';
import { authAxios } from '../../../api/common';
import apiPath from '../../../api/apiPath';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { SET_USER } from '../../../reducers/userReducer';

const MyPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.tokenReducer.userId);

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
      getUserData(userId);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const username = useSelector((state) => state.userReducer.user);
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

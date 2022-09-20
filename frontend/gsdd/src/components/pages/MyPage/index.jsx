import React from 'react';
import styled from 'styled-components';
import * as S from './styles';
import { FcLike } from 'react-icons/fc';
import MypageCard from '../../molecules/MypageCard';
import Navbar from '../../molecules/Navbar';

const Test = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  margin-bottom: 100px;
`;

const MyPage = () => {
  const username = '싸피';
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

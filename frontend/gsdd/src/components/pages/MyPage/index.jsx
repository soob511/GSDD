import React, { useEffect } from 'react';
import * as S from './styles';
import { FcLike } from 'react-icons/fc';
import MypageCard from '../../molecules/MypageCard';
import Sidebar from '../../molecules/Sidebar';
import { authAxios } from '../../../api/common';
import apiPath from '../../../api/apiPath';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { SET_USER } from '../../../reducers/userReducer';
// import Map from '../../atoms/Map';

const MyPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.tokenReducer.userId);
  const display = useSelector((state) => state.tokenReducer.display);

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

  // if (display == true) {
  //   return (
  //     <>
  //       <Sidebar />
  //       <S.MapWrapper>
  //         <Map type='mypage' />
  //       </S.MapWrapper>
  //     </>
  //   );
  // } else {
  return (
    <>
      <Sidebar />
      <S.ArticleCard>
        {username}님! 오늘도 안전길 다니세요
        <FcLike size="1.3rem" />
      </S.ArticleCard>
      <MypageCard />
    </>
  );
  // }
};

export default MyPage;

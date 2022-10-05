import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Navbar from '../../molecules/Navbar';
import MapContainer from '../../molecules/MapContainer';
import Sidebar from '../../molecules/Sidebar';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { SET_USER } from '../../../reducers/userReducer';
import { authAxios } from '../../../api/common';
import apiPath from '../../../api/apiPath';

const Home = () => {
  const dispatch = useDispatch();

  const side = useRef(null);
  console.log(side);
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
  // const onSidebarToggle = useCallback(() => {
  //   sidebarToggle.current.toggleMenu()
  // })
  // console.log(sidebarToggle.current.toggleMenu)
  // useEffect(() => {
  //   sidebarToggle.current.toggleMenu();
  // }, []);
  return (
    <>
      {/* <Sidebar ref={side} /> */}
      <Sidebar />
      {/* <Navbar /> */}
      <MapContainer />
    </>
  );
};

export default Home;

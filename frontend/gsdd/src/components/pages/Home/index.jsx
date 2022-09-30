import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Navbar from '../../molecules/Navbar';
import MapContainer from '../../molecules/MapContainer';
import Sidebar from '../../molecules/Sidebar';

const Home = () => {
  const side = useRef(null);
  console.log(side);
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
      <Sidebar/>
      {/* <Navbar /> */}
      <MapContainer />
    </>
  );
};

export default Home;

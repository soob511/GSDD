import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Navbar from '../../molecules/Navbar';
import MapConfig from '../../molecules/MapConfig';
import Sidebar from '../../molecules/Sidebar';
// const flex = css`
//   background: white;
//   position: relative;
// `;

// const Container = styled.div`
//   ${flex}
//   width: 100%;
//   height: 100%;
// `;

const Home = () => {
  
  const side = useRef(null); 
  console.log(side)
  // const onSidebarToggle = useCallback(() => {
  //   sidebarToggle.current.toggleMenu()
  // })
  // console.log(sidebarToggle.current.toggleMenu)
  // useEffect(() => {
  //   sidebarToggle.current.toggleMenu();
  // }, []);
  return (
    <>
      <Sidebar ref={side}/>
      <Navbar />
      <MapConfig />
    </>
  );
};

export default Home;

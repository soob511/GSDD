import React from 'react';
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
  return (
    <>
      <Navbar />
      <Sidebar />
      <MapConfig />
    </>
  );
};

export default Home;

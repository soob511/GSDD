import React from 'react';
import Navbar from '../../molecules/Navbar';
import MapConfig from '../../molecules/MapConfig';

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
      <MapConfig />
    </>
  );
};

export default Home;

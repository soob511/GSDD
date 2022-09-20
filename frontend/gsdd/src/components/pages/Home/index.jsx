import React from 'react';
import styled, { css } from 'styled-components';

const flex = css`
  background: white;
  position: relative;
`;

const Container = styled.div`
  ${flex}
  width: 100%;
  height: 100%;
`;

const Home = () => {
  return (
    <>
      <Container />
    </>
  );
};

export default Home;

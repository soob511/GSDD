import React, { useState } from 'react';
import * as S from './styles';
import axios from 'axios';
import Map from '../../atoms/Map';
import Button from '../../atoms/Button';
import useGeoLocation from '../../../hooks/useGeoLocation';

const MapContainer = () => {

  const location = useGeoLocation();

  const getCurrentPosition = () => {


  };

  return (
    <>
      <S.StyledMapContainer>
        <Map />
        <Button.RoundButton onClick={getCurrentPosition}>현위치</Button.RoundButton>
      </S.StyledMapContainer>
    </>
  );
};

export default MapContainer;
import React, { useState } from 'react';
import * as S from './styles';
import Map from '../../atoms/Map';
import Button from '../../atoms/Button';
import useGeoLocation from '../../../hooks/useGeoLocation';

const MapContainer = () => {

  // const location = useGeoLocation();

  const getCurrentPosition = async () => {
    console.log("clicked! ");
  };

  return (
    <>
      <S.StyledMapContainer>
        <Map />
        <Button styleType='round' onClick={getCurrentPosition}>현위치</Button>
      </S.StyledMapContainer>
    </>
  );
};

export default MapContainer;
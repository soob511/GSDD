import React, { useEffect, useState } from 'react';
import * as S from './styles';
import Map from '../../atoms/Map';
import Button from '../../atoms/Button';
import mapInfo from './mapInfo';
import getMarkers from './getMarkers';

const MapContainer = () => {

  const [mapInfos, setMapInfos] = useState({
    TmapV2: '',
    map: '',
    position: '',
    location: '',
    marker: '',
  });
  const [markers, setMarkers] = useState({
    lights: [],
    cameras: [],
    houses: [],
  });

  const [mode, setMode] = useState(false);
  const [btnActive, setBtnActive] = useState({
    lights: false,
    cameras: false,
    houses: false,
  });

  const getMapInfo = async () => {
    setMapInfos(await mapInfo());
    console.log(mapInfos);
  }

  const getRoad = () => {
    console.log("getRoad");
  }

  const getMode = () => {
    setMode(!mode);
    setMarkers(getMarkers(mapInfos.TmapV2, mapInfos.map, mapInfos.position.coords.latitude, mapInfos.position.coords.longitude));
  }

  const getLights = () => {
    setBtnActive((prevState) => {
      return { ...prevState, lights: !prevState.lights }
    });
    if (btnActive.lights) {
      console.log("가로등 다 지운다");
    } else {
      console.log("가로등 표시한다");

    }

  }

  const getCameras = () => {
    console.log("getCameras");
    setBtnActive((prevState) => {
      return { ...prevState, cameras: !prevState.cameras }
    });
  }

  const getHouses = () => {
    console.log("getHouses");
    setBtnActive((prevState) => {
      return { ...prevState, houses: !prevState.houses }
    });
  }

  useEffect(() => {
    getMapInfo();
  }, []);

  return (
    <>
      <S.StyledMapContainer>
        <Map map={mapInfos.map} />
        <S.StyledButtonHorizontalContainer className={mode ? 'show-mode' : 'hide-mode'}>
          <Button styleType='round' onClick={getLights} active={btnActive.lights}>가로등</Button>
          <Button styleType='round' onClick={getCameras} active={btnActive.cameras}>CCTV</Button>
          <Button styleType='round' onClick={getHouses} active={btnActive.houses}>안전집</Button>
        </S.StyledButtonHorizontalContainer>
        <S.StyledButtonVerticalContainer>
          <Button styleType='round' onClick={getMapInfo}>현위치</Button>
          <Button styleType='round' onClick={getRoad}>길찾기</Button>
          <Button styleType='round' onClick={getMode}>모드</Button>
        </S.StyledButtonVerticalContainer>
      </S.StyledMapContainer>
    </>
  );
};

export default MapContainer;
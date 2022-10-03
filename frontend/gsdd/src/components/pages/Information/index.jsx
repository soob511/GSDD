import React, {useEffect, useRef, useState} from 'react';
import Select from 'react-select'
import Navbar from '../../molecules/Navbar';
import Sidebar from '../../molecules/Sidebar';
import { defaultAxios } from '../../../api/common';
import apiPath from '../../../api/apiPath';
import * as S from './styles'
import imgInfo from '../../../assets/info.png'

const city = [
  { label: '대전광역시', value: '대전광역시' },
];

const district = [
    { label: '동구', value: '동구'},
    { label: '중구', value: '중구'},
    { label: '서구', value: '서구'},
    { label: '유성구', value: '유성구'},
    { label: '대덕구', value: '대덕구'},
];

const Information = () => {

  const [ infoVisible, setInfoVisible ] = useState(false)
  const onInfoVisible = () => {
    if (infoVisible) {
      setInfoVisible(false)
    } else {
      setInfoVisible(true)
    }
  }
  const infoRef = useRef(null)
  // {city: provided => ({...provided, width: 140, height: 40, marginRight: 8})}
  // {district: provided => ({...provided, width: 108, height: 40})}
  const [selectCity, setSelectCity] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [safetyValue, setSafetyValue] = useState(null);
  
  const safetyRef = useRef(0);
  // 구 바뀔때마다 해당 구 내의 데이터 불러오는 API 실행 예정
  useEffect(() => {
    setSelectCity(selectCity)
    setSelectDistrict(selectDistrict)
    setSafetyValue(safetyRef.current.innerText)
    console.log(selectCity)     // 안전지수 및 그 외 정보 load API 실행
    console.log(selectDistrict) // 해당 지역 뉴스 기사 load API 실행
    console.log(safetyValue)
    
    fetchArea(selectCity, selectDistrict)
  },[selectCity, selectDistrict])

  useEffect(() => {

  }, [onInfoVisible])

  const fetchArea = async (selectCity, selectDistrict) => {
    try {
      const response = await defaultAxios
      .get(apiPath.info.get((selectCity, selectDistrict)), {})
      console.log(response.data)
    }
    catch (e){
      console.log(e)
    }
  }
  const news = [
    {title : "뉴스 기사1 뉴스 기사1 뉴스 기사1 뉴스 기사1 뉴스 기사1", content: "내용1"},
    {title : "뉴스 기사2", content: "내용2"},
    {title : "뉴스 기사3", content: "내용3"},
    {title : "뉴스 기사4", content: "내용4"},
    {title : "뉴스 기사5", content: "내용5"},
    {title : "뉴스 기사6", content: "내용6"},
    {title : "뉴스 기사7", content: "내용7"},
    {title : "뉴스 기사8", content: "내용8"},
    {title : "뉴스 기사9", content: "내용9"},
  ]
  const info = [
    "행정안전부에서 지역별 안전수준과 안전의식을 지표별로 객관적으로 도출해낸 지수입니다. 총 6개의 가중치(교통사고, 화재, 범죄, 생활안전, 자살, 감염병)가 위해지표로 사용되었으며 본 서비스에서 제공하는 안전지수의 지표는 [",
    "2021",
    "년의 ",
    "범죄",
    " 지표] 입니다."
  ]

  const newsList = news.map((article) => <S.Article onClick={() => console.log(article.content)}>{article.title}</S.Article>)
  const infoList = info.map((text) => <S.InfoText>{text}</S.InfoText>)

  return (
    <>
      <Sidebar />
      {/* <Navbar /> */}
      <S.Container>
        <S.Header>
          <S.RowBox>
            <S.StyledSelect city placeholder="시" options={city} onChange={setSelectCity}/>
            <S.StyledSelect district placeholder="구" options={district} onChange={setSelectDistrict}/>
          </S.RowBox>
          <S.RowBox>
            <span style={{fontSize:'13px'}}>안전지수란?</span>
            <S.Button onClick={onInfoVisible}><img src={imgInfo} style={{alignItems: 'center'}}></img></S.Button>
          </S.RowBox>
        </S.Header>
          <S.Content info visible={infoVisible}>
            {infoList}
          </S.Content>
        <S.Content>
          <S.ColumnBox>
            <S.Item>안전지수</S.Item>
            <S.Item safety ref={safetyRef} value={safetyValue}>{selectCity == null ? "0" : "3"}</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>가로등</S.Item>
            <S.Item number>{selectCity == null ? "0" : "3,795"}</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>CCTV</S.Item>
            <S.Item number>{selectCity == null ? "0" : "780"}</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>안전지킴이집</S.Item>
            <S.Item number>{selectCity == null ? "0" : "83"}</S.Item>
          </S.ColumnBox>
        </S.Content>

        <div style={{fontSize: "24px", fontWeight: "bold"}}>우리 동네 기사</div>
        <S.Content news>
          {newsList}
        </S.Content>
      </S.Container>
    </>
  );
};

export default Information;
import React, {useEffect, useRef, useState} from 'react';
import Select from 'react-select'
import Navbar from '../../molecules/Navbar';
import Sidebar from '../../molecules/Sidebar';
import { authAxios } from '../../../api/common';
import apiPath from '../../../api/apiPath';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import * as S from './styles'
import imgInfo from '../../../assets/info.png'
import { SET_INFO, SET_NEWS } from '../../../reducers/infoReducer';

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
  const dispatch = useDispatch();

  const [ infoVisible, setInfoVisible ] = useState(false)
  const onInfoVisible = () => {
    if (infoVisible) {
      setInfoVisible(false)
    } else {
      setInfoVisible(true)
    }
  }
  // {city: provided => ({...provided, width: 140, height: 40, marginRight: 8})}
  // {district: provided => ({...provided, width: 108, height: 40})}
  const [selectCity, setSelectCity] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  // const [safetyValue, setSafetyValue] = useState("");
  // const [infoData, setInfoData] = useState("");
  // 구 바뀔때마다 해당 구 내의 데이터 불러오는 API 실행 예정

  
  const fetchArea = async (selectCity, selectDistrict) => {
    await authAxios
    .get(apiPath.info.get(selectCity.value, selectDistrict.value), {})
    .then((res) => {
      console.log(res.data)
      dispatch(SET_INFO(res.data['지역정보']))
    })
    .catch((e) => {
      console.log(e)
    })

    await authAxios
    .get(apiPath.news.get((''+selectCity.value).substring(0,2), selectDistrict.value), {})
    .then((res) => {
      console.log(res.data)
      dispatch(SET_NEWS(res.data.news))
    })
    .catch((e) => {
      console.log(e)
    })
  };

  useEffect(() => {
    fetchArea(selectCity, selectDistrict)
  }, [])
  useEffect(() => {
    try{
      setSelectCity(selectCity)
      setSelectDistrict(selectDistrict)
      console.log(selectCity.value)     // 안전지수 및 그 외 정보 load API 실행
      console.log(selectDistrict.value) // 해당 지역 뉴스 기사 load API 실행
      fetchArea(selectCity, selectDistrict)
    } catch(e) {
      console.log(e)
    }
  },[selectCity, selectDistrict])

  useEffect(() => {

  }, [onInfoVisible])
  
  // const news = [
  //   {title : "뉴스 기사1 뉴스 기사1 뉴스 기사1 뉴스 기사1 뉴스 기사1", content: "내용1"},
  //   {title : "뉴스 기사2", content: "내용2"},
  //   {title : "뉴스 기사3", content: "내용3"},
  //   {title : "뉴스 기사4", content: "내용4"},
  //   {title : "뉴스 기사5", content: "내용5"},
  //   {title : "뉴스 기사6", content: "내용6"},
  //   {title : "뉴스 기사7", content: "내용7"},
  //   {title : "뉴스 기사8", content: "내용8"},
  //   {title : "뉴스 기사9", content: "내용9"},
  // ]
  const info = [
    "행정안전부에서 지역별 안전수준과 안전의식을 지표별로 객관적으로 도출해낸 지수입니다. 총 6개의 가중치(교통사고, 화재, 범죄, 생활안전, 자살, 감염병)가 위해지표로 사용되었으며 본 서비스에서 제공하는 안전지수의 지표는 [",
    "2021",
    "년의 ",
    "범죄",
    " 지표] 입니다."
  ]
  const news = useSelector((state) => state.infoReducer.news);
  const newsList = news.map((article) => <S.Article onClick={() => {window.location.href = article.url;}}>{article.title}</S.Article>)
  console.log(news)
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
            <S.Item safety value={useSelector((state) => state.infoReducer.safe)}>{useSelector((state) => state.infoReducer.safe)}</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>가로등</S.Item>
            <S.Item number>{useSelector((state) => state.infoReducer.infos[0].cnt)}</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>CCTV</S.Item>
            <S.Item number>{useSelector((state) => state.infoReducer.infos[1].cnt)}</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>안전지킴이집</S.Item>
            <S.Item number>{useSelector((state) => state.infoReducer.infos[2].cnt)}</S.Item>
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
import React, {useRef, useState} from 'react';
import Select from 'react-select'
import Navbar from '../../molecules/Navbar';
import Sidebar from '../../molecules/Sidebar';
import * as S from './styles'
import imgInfo from '../../../assets/info.png'

const infoText0 = "행정안전부에서 지역별 안전수준과 안전의식을 지표별로 객관적으로 도출해낸 지수입니다. 총 6개의 가중치(교통사고, 화재, 범죄, 생활안전, 자살, 감염병)가 위해지표로 사용되었으며 본 서비스에서 제공하는 안전지수의 지표는 ["
const infoText1 = "2021"
const infoText2 = "년의 "
const infoText3 = "범죄"
const infoText4 = " 지표] 입니다."

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
  const [ visible, setVisible ] = useState(false)
  const onVisible = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  // {city: provided => ({...provided, width: 140, height: 40, marginRight: 8})}
  // {district: provided => ({...provided, width: 108, height: 40})}
  const [selectCity, setSelectCity] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  console.log(selectCity)
  console.log(selectDistrict)
  return (
    <>
      {/* <Sidebar /> */}
      <Navbar />
      <S.Container>
        <S.Header>
          <S.RowBox>
            <S.StyledSelect city placeholder="시" options={city} onChange={setSelectCity}/>
            <S.StyledSelect district placeholder="구" options={district} onChange={setSelectDistrict}/>
          </S.RowBox>
          <S.RowBox>
            <span style={{fontSize:'13px'}}>안전지수란?</span>
            <S.Button onClick={onVisible}><img src={imgInfo} style={{alignItems: 'center'}}></img></S.Button>
          </S.RowBox>
        </S.Header>
          <S.Content info visible={visible}>
            <S.InfoText>{infoText0}</S.InfoText>
            <S.InfoText>{infoText1}</S.InfoText>
            <S.InfoText>{infoText2}</S.InfoText>
            <S.InfoText>{infoText3}</S.InfoText>
            <S.InfoText>{infoText4}</S.InfoText>
          </S.Content>
        <S.Content>
          <S.ColumnBox>
            <S.Item>안전지수</S.Item>
            <S.Item safety>3</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>가로등</S.Item>
            <S.Item number>3,795</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>CCTV</S.Item>
            <S.Item number>780</S.Item>
          </S.ColumnBox>
          <S.ColumnBox>
            <S.Item>안전지킴이집</S.Item>
            <S.Item number>83</S.Item>
          </S.ColumnBox>
        </S.Content>

        <div style={{fontSize: "24px", fontWeight: "bold"}}>우리 동네 기사</div>
        <S.Content news>
          <S.Article>뉴스 기사1 뉴스 기사1 뉴스 기사1 뉴스 기사1 뉴스 기사1</S.Article>
          <S.Article>뉴스 기사2 </S.Article>
          <S.Article>뉴스 기사3</S.Article>
          <S.Article>뉴스 기사4</S.Article>
          <S.Article>뉴스 기사5</S.Article>
        </S.Content>
      </S.Container>
    </>
  );
};

export default Information;
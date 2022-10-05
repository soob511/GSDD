import axios from 'axios';

const getShortestPath = async (map, origin, destination) => {

    const { Tmapv2 } = window;

    const DrawLine = {};

    DrawLine.map = map;
    DrawLine.omarker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(origin.lat, origin.lon),
        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
        iconSize: new Tmapv2.Size(24, 38),
        map: DrawLine.map,
    });
    DrawLine.dmarker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(destination.lat, destination.lon),
        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
        iconSize: new Tmapv2.Size(24, 38),
        map: DrawLine.map,
    });
    DrawLine.pointList = [];
    DrawLine.line = null;

    DrawLine.setMapBound = async function () {

        console.log("setMapBound");
        const positionBounds = new Tmapv2.LatLngBounds(); // bounds 인스턴스를 생성합니다.

        const boundPosition1 = new Tmapv2.LatLng(origin.lat, origin.lng);
        positionBounds.extend(boundPosition1);

        const boundPosition2 = new Tmapv2.LatLng(destination.lat, destination.lng);
        positionBounds.extend(boundPosition2);

        DrawLine.map.panToBounds(positionBounds); // 매칭전 좌표가 한눈에 들어올 수 있는 지도 중심과 줌레벨 설정
    }

    DrawLine.drawLine = function (arrPointList) {
        console.log("shortest", arrPointList);
        const polyline_ = new Tmapv2.Polyline({
            path: arrPointList,
            strokeColor: "#DD0000",
            strokeWeight: 6,
            map: DrawLine.map,
        });
        DrawLine.line = polyline_;
    }

    const data = await axios({
        method: 'POST',
        url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function',
        headers: {
            appKey: 'l7xxd1c2344c5b154c50a810779b023d8b97'
        },
        data: {
            "appKey": 'l7xxd1c2344c5b154c50a810779b023d8b97',
            "startX": origin.lon,
            "startY": origin.lat,
            "endX": destination.lon,
            "endY": destination.lat,
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857",
            "startName": "%EC%B6%9C%EB%B0%9C",
            "endName": "%EB%8F%84%EC%B0%A9"
        },
        async: false,
    }).then(res => {

        const resultData = res.data.features;
        console.log(resultData);

        for (let i in resultData) {
            const geometry = resultData[i].geometry;

            if (geometry.type === "LineString") {
                for (let j in geometry.coordinates) {
                    // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                    const latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                    // 포인트 객체를 받아 좌표값으로 변환
                    var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                    // 포인트객체의 정보로 좌표값 변환 객체로 저장
                    var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                    // 배열에 담기
                    DrawLine.pointList.push(convertChange);
                }
            }
        }

        //결과 출력
        const tDistance = "총 거리 : " + ((resultData[0].properties.totalDistance) / 1000).toFixed(1) + "km,";
        const tTime = " 총 시간 : " + ((resultData[0].properties.totalTime) / 60).toFixed(0) + "분";
        console.log(tDistance, tTime);


    }).catch(res => console.log(res));

    await DrawLine.setMapBound();//polyline생성될 바운더리 지정

    DrawLine.drawLine(DrawLine.pointList); //polyline 생성

    return { 'omarker': DrawLine.omarker, 'dmarker': DrawLine.dmarker, 'line': DrawLine.line };

};


export default getShortestPath;
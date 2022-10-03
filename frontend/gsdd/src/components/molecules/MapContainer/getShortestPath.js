import axios from 'axios';

const getShortestPath = async (map, origin, destination) => {

    const { Tmapv2 } = window;

    const resultdrawArr = [];
    const drawInfoArr = [];

    //출발지 마커
    const marker_o = new Tmapv2.Marker(
        {
            position: new Tmapv2.LatLng(origin.lat, origin.lng),
            icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
            iconSize: new Tmapv2.Size(24, 38),
            map: map,
        });

    //도착지 마커
    const marker_d = new Tmapv2.Marker(
        {
            position: new Tmapv2.LatLng(destination.lat, destination.lng),
            icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
            iconSize: new Tmapv2.Size(24, 38),
            map: map,
        });


    console.log(origin, destination);

    const data = await axios({
        method: 'POST',
        url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function',
        headers: {
            appKey: 'l7xxd1c2344c5b154c50a810779b023d8b97'
        },
        data: {
            "appKey": 'l7xxd1c2344c5b154c50a810779b023d8b97',
            "startX": origin.lng,
            "startY": origin.lat,
            "endX": destination.lng,
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

        //결과 출력
        const tDistance = "총 거리 : " + ((resultData[0].properties.totalDistance) / 1000).toFixed(1) + "km,";
        const tTime = " 총 시간 : " + ((resultData[0].properties.totalTime) / 60).toFixed(0) + "분";

        console.log(tDistance, tTime);

        // for (let i in resultData) {
        //     const geometry = resultData[i].geometry;

        //     if (geometry.type === "LineString") {
        //         for (let j in geometry.coordinates) {
        //             // 경로들의 결과값(구간)들을 포인트 객체로 변환 
        //             const latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
        //             // 포인트 객체를 받아 좌표값으로 변환
        //             var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
        //             // 포인트객체의 정보로 좌표값 변환 객체로 저장
        //             var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
        //             // 배열에 담기
        //             drawInfoArr.push(convertChange);
        //         }
        //     }
        // }

        // drawLine(drawInfoArr);

        for (var i in resultData) { //for문 [S]
            var geometry = resultData[i].geometry;
            var properties = resultData[i].properties;


            if (geometry.type == "LineString") {
                for (var j in geometry.coordinates) {
                    // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                    var latlng = new Tmapv2.Point(
                        geometry.coordinates[j][0],
                        geometry.coordinates[j][1]);
                    // 포인트 객체를 받아 좌표값으로 변환
                    var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                        latlng);
                    // 포인트객체의 정보로 좌표값 변환 객체로 저장
                    var convertChange = new Tmapv2.LatLng(
                        convertPoint._lat,
                        convertPoint._lng);
                    // 배열에 담기
                    drawInfoArr.push(convertChange);
                }
            } else {
                var markerImg = "";
                var pType = "";
                var size;

                if (properties.pointType == "S") { //출발지 마커
                    markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                    pType = "S";
                    size = new Tmapv2.Size(24, 38);
                } else if (properties.pointType == "E") { //도착지 마커
                    markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                    pType = "E";
                    size = new Tmapv2.Size(24, 38);
                } else { //각 포인트 마커
                    markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                    pType = "P";
                    size = new Tmapv2.Size(8, 8);
                }

                // 경로들의 결과값들을 포인트 객체로 변환 
                var latlon = new Tmapv2.Point(
                    geometry.coordinates[0],
                    geometry.coordinates[1]);

                // 포인트 객체를 받아 좌표값으로 다시 변환
                var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    latlon);

                var routeInfoObj = {
                    markerImage: markerImg,
                    lng: convertPoint._lng,
                    lat: convertPoint._lat,
                    pointType: pType
                };

                // Marker 추가
                const marker_p = new Tmapv2.Marker(
                    {
                        position: new Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
                        icon: routeInfoObj.markerImage,
                        iconSize: size,
                        map: map
                    });
                console.log("marker", marker_p);
            }
        }//for문 [E]
        drawLine(drawInfoArr);

    }).catch(res => console.log(res));

    return { 'omarker': marker_o, 'dmarker': marker_d, 'lines': resultdrawArr };

    function drawLine(arrPointList) {
        for (const k in arrPointList) {
            const polyline_ = new Tmapv2.Polyline({
                path: arrPointList[k],
                fillColor: "#DD0000",
                strokeColor: "#DD0000",
                strokeWeight: 6,
                map: map,
            });
            polyline_.setVisible(true);
            console.log(polyline_.getPath());
            resultdrawArr.push(polyline_);
            console.log("polyline", polyline_);
        }

    }

};

export default getShortestPath;
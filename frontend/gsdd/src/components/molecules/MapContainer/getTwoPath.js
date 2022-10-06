import axios from 'axios';
import apiPath from '../../../api/apiPath';
import { authAxios } from '../../../api/common';

const getTwoPath = async (map, origin, destination) => {

    console.log("getTwoPath");

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
    DrawLine.shortPointList = [];
    DrawLine.shortLatLngList = [];
    DrawLine.nearLightPointList = []; //출발지에서 목적지 사이의 인접한 가로등 목록 추출
    DrawLine.boundaryPointList = [];
    DrawLine.safePointList = [];
    DrawLine.safeLatLngList = [];
    DrawLine.polyline_short = null;
    DrawLine.polyline_safe = null;

    DrawLine.firstDetourStart = {};
    DrawLine.firstDetourEnd = {};
    DrawLine.firstDetourStartIndex = -1;
    DrawLine.firstDetourEndIndex = -1;
    DrawLine.isDetour = false;

    DrawLine.aroundLampList = [];

    //주어진 도(degree) 값을 라디언으로 변환
    DrawLine.deg2rad = function (deg) {
        return (deg * Math.PI / 180);
    }

    //주어진 라디언(radian) 값을 도(degree) 값으로 변환
    DrawLine.rad2deg = function (rad) {
        return (rad * 180 / Math.PI);
    }

    DrawLine.calcDistance = function (lat1, lon1, lat2, lon2) {
        var theta, dist;

        if (lon1 === lon2 && lat1 === lat2)
            return 0;

        theta = lon1 - lon2;
        dist = Math.sin(DrawLine.deg2rad(lat1)) * Math.sin(DrawLine.deg2rad(lat2)) + Math.cos(DrawLine.deg2rad(lat1))
            * Math.cos(DrawLine.deg2rad(lat2)) * Math.cos(DrawLine.deg2rad(theta));
        dist = Math.acos(dist);
        dist = DrawLine.rad2deg(dist);

        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344; // 단위 mile 에서 km 변환
        //dist = dist * 1000.0; // 단위  km 에서 m 로 변환

        return Number(Number(dist));
    }


    DrawLine.distance = function (x1, y1, x2, y2, targetX, targetY) {

        if (x2 - x1 === 0) return -1;
        let m = (y2 - y1) / (x2 - x1);
        let c = y1 - (m * x1);
        let distance = Math.abs(m * targetX - targetY + c) / (Math.sqrt(Math.pow(m, 2) + 1));
        return distance;
    }

    // DrawLine.line = function (p1, p2) {
    //     let A = (p1[1] - p2[1]);
    //     let B = (p2[0] - p1[0]);
    //     let C = (p1[0] * p2[1] - p2[0] * p1[1]);
    //     return [A, B, C];
    // }

    // DrawLine.intersection = function (L1, L2) {
    //     let D = L1[0] * L2[1] - L1[1] * L2[0];
    //     let Dx = L1[2] * L2[1] - L1[1] * L2[2];
    //     let Dy = L1[0] * L2[2] - L1[2] * L2[0];
    //     if (D !== 0) {
    //         let x = Dx / D
    //         let y = Dy / D;
    //         return [x, y];
    //     }
    //     return null;
    // }

    DrawLine.getNearLightPointList = async function () {

        await authAxios
            .get(apiPath.bound.get(origin.lat, origin.lon, destination.lat, destination.lon), {})
            .then(res => {
                DrawLine.boundaryPointList = res.data.road;
                console.log("boundaryPointList", DrawLine.boundaryPointList);
                for (let i = 0; i < DrawLine.boundaryPointList; i++) {
                    var tempmarkers = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(DrawLine.boundaryPointList[i].lat, DrawLine.boundaryPointList[i].lon),
                        icon: "http://topopen.tmap.co.kr/imgs/point.png",
                        iconSize: new Tmapv2.Size(10, 10),
                        map: DrawLine.map,
                    });
                }
            });


        let startPoint = 0;
        let lampCount = 0;
        let partialDistance = 0;
        let targetX = 0, targetY = 0;
        let firstPoint = true;

        for (let i = 0; i < DrawLine.shortPointList.length - 1; i++) {
            const x1 = DrawLine.shortPointList[i].lat;
            const y1 = DrawLine.shortPointList[i].lon;
            const x2 = DrawLine.shortPointList[i + 1].lat;
            const y2 = DrawLine.shortPointList[i + 1].lon;
            console.log(x1, y1, x2, y2);

            let baseDistance = 0.0005; //약 25m
            partialDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + partialDistance;
            console.log(i + "번째 partialDistance:" + partialDistance);

            //경계 내의 가로등 좌표 중 경계 근처에 있는 것 탐색
            for (let i = 0; i < DrawLine.boundaryPointList.length; i++) {

                targetX = DrawLine.boundaryPointList[i].lat;
                targetY = DrawLine.boundaryPointList[i].lon;

                let dist = DrawLine.distance(x1, y1, x2, y2, targetX, targetY);

                if (dist < 0) continue;
                if (dist < 0.0009) { //(0.00013은 약 15m)
                    let m = (y2 - y1) / (x2 - x1);
                    // let randomX = targetX - 1;
                    // let randomY = -1 / m * randomX + targetY + (targetX / m);

                    // let L1 = DrawLine.line([x1, y1], [x2, y2]);
                    // let L2 = DrawLine.line([targetX, targetY], [randomX, randomY]);

                    // let R = DrawLine.intersection(L1, L2);

                    // let R0 = 0;
                    // if (R != null) {
                    //     R0 = R[0];
                    // } else {
                    //     continue;
                    // }

                    // if ((x1 <= R0 && R0 <= x2) || (x2 <= R0 && R0 <= x1)) {
                    //     DrawLine.nearLightPointList.push({ targetX, targetY });
                    //     console.log("nearLightPoint:", { targetX, targetY });
                    //     lampCount += 1;
                    // }

                    if ((x1 + m * y1 <= targetX + m * targetY) && (targetX + m * targetY <= x2 + m * y2)) {
                        DrawLine.nearLightPointList.push({ targetX, targetY });
                        console.log("nearLightPoint:", { targetX, targetY });
                        lampCount += 1;
                    }
                }
            }

            console.log("[" + (i + 1) + " ~ " + (i + 2) + "] lampCount : " + lampCount);
            if (partialDistance >= baseDistance || i == DrawLine.shortPointList.length - 2) {
                console.log("[node " + (startPoint) + " ~ " + (i + 1) + " ] 가로등 갯수 : " + lampCount + "\n");
                if (lampCount < 2) {
                    DrawLine.isDetour = true;
                    console.log("탐색하면 안되는 길 입니다");
                    if (firstPoint) {
                        console.log(DrawLine.shortPointList);
                        console.log({ 'lat': DrawLine.shortPointList[startPoint + 1].lat, 'lon': DrawLine.shortPointList[startPoint + 1].lon });
                        console.log({ 'lat': DrawLine.shortPointList[i + 2].lat, 'lon': DrawLine.shortPointList[i + 2].lon });
                        DrawLine.firstDetourStart = { 'lat': DrawLine.shortPointList[startPoint + 1].lat, 'lon': DrawLine.shortPointList[startPoint + 1].lon };
                        DrawLine.firstDetourEnd = { 'lat': DrawLine.shortPointList[i + 1].lat, 'lon': DrawLine.shortPointList[i + 1].lon };
                        DrawLine.firstDetourStartIndex = startPoint + 1;
                        DrawLine.firstDetourEndIndex = i + 1;
                        firstPoint = false;
                    }
                }
                else {
                    partialDistance = 0;
                    lampCount = 0;
                    startPoint = i;
                }
            }
        }
    }

    DrawLine.pointDistance = function (x, y) {
        console.log(x.lat, x.lon, y.lat, y.lon);
        return Math.sqrt(Math.pow(x.lat - y.lat, 2) + Math.pow(x.lon - y.lon, 2));
    }

    DrawLine.pointDistance2 = function (x, y) {
        return Math.sqrt(Math.pow(x.lat - y.lat, 2) + Math.pow(x.lon - y.lon, 2));
    }

    DrawLine.contains = function (arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].lat === val.lat && arr[i].lon === val.lon) {
                return true;
            }
        }
        return false;
    }

    DrawLine.remove = function (arr, val) {
        let newarr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].lat === val.lat && arr[i].lon === val.lon) {
                continue;
            }
            newarr.push(arr[i].lon);
        }
        return newarr;
    }

    DrawLine.getNewBoundList = async function (src_idx, dst_idx) {
        DrawLine.aroundLampList = [];

        //다음 경로까지의 길이를 반경 값으로 설정.
        let radius = DrawLine.calcDistance(DrawLine.boundaryPointList[src_idx].lat, DrawLine.boundaryPointList[src_idx].lon, DrawLine.boundaryPointList[dst_idx].lat, DrawLine.boundaryPointList[dst_idx].lon) + 0.0005;
        for (let i = 0; i < DrawLine.boundaryPointList.length; i++) {
            let dist = DrawLine.calcDistance(DrawLine.boundaryPointList[i].lat, DrawLine.boundaryPointList[i].lon, DrawLine.boundaryPointList[src_idx].lat, DrawLine.boundaryPointList[src_idx].lon);

            if (dist <= radius && DrawLine.contains(DrawLine.nearLightPointList, DrawLine.boundaryPointList[i]) === false) {
                DrawLine.aroundLampList.push(DrawLine.boundaryPointList[i]);
            }
        }
        console.log("getNewBoundList", DrawLine.aroundLampList);

    }

    DrawLine.findShortestLamp = function () {

        let result = null;
        let maxCost = 0;

        //주위 가로등에서 원래 경로상에 가로등 제거
        for (let d = 0; d < DrawLine.nearLightPointList; d++) {
            if (DrawLine.contains(DrawLine.aroundLampList, DrawLine.nearLightPointList[d])) {
                DrawLine.aroundLampList = DrawLine.remove(DrawLine.aroundLampList, DrawLine.nearLightPointList[d]);
            }
        }

        for (let i = 0; i < DrawLine.aroundLampList.length; i++) {
            let dist = DrawLine.calcDistance(DrawLine.firstDetourStart.lat, DrawLine.firstDetourStart.lon, DrawLine.aroundLampList[i].lat, DrawLine.aroundLampList[i].lon);
            if (maxCost < dist) {
                maxCost = dist;
                result = DrawLine.aroundLampList[i];
            }
        }

        console.log(result)

        return result;
    }

    DrawLine.drawLine = function (type, arrPointList) {

        if (type === "short") {
            DrawLine.polyline_short = new Tmapv2.Polyline({
                path: arrPointList,
                strokeColor: "#DD0000",
                strokeWeight: 6,
                map: DrawLine.map,
            });
        } else if (type === "safe") {
            DrawLine.polyline_safe = new Tmapv2.Polyline({
                path: arrPointList,
                //strokeColor: "#0067a3",
                strokeColor: "#00FF00",
                strokeWeight: 6,
                map: DrawLine.map,
            });
        }

    }

    DrawLine.getShortPointList = async function (arr, arrLatLng, origin, destination) {
        await axios({
            method: 'POST',
            url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function',
            headers: {
                appKey: 'l7xx49e27051d70e475a8285bb568e35a081'
            },
            data: {
                "appKey": 'l7xx49e27051d70e475a8285bb568e35a081',
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
            console.log("data", resultData);

            //결과 출력
            const tDistance = "총 거리 : " + ((resultData[0].properties.totalDistance) / 1000).toFixed(1) + "km,";
            const tTime = " 총 시간 : " + ((resultData[0].properties.totalTime) / 60).toFixed(0) + "분";

            console.log(tDistance, tTime);

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
                        arr.push({ 'lat': convertPoint._lat, 'lon': convertPoint._lng });
                        arrLatLng.push(convertChange);
                    }
                }
            }

            console.log("shortest arr", arr);

        }).catch(res => console.log(res));

    };

    DrawLine.setMapBound = async () => {

        console.log("setMapBound");
        const positionBounds = new Tmapv2.LatLngBounds();
        const omarker_position = new Tmapv2.LatLng(origin.lat, origin.lon);
        positionBounds.extend(omarker_position);

        const dmarker_position = new Tmapv2.LatLng(destination.lat, destination.lon);
        positionBounds.extend(dmarker_position);

        for (let i = 0; i < DrawLine.shortLatLngList; i++) {
            positionBounds.extend(DrawLine.shortLatLngList[i]);
        }

        for (let i = 0; i < DrawLine.safeLatLngList; i++) {
            positionBounds.extend(DrawLine.safeLatLngList[i]);
        }

        DrawLine.map.panToBounds(positionBounds); // 매칭전 좌표가 한눈에 들어올 수 있는 지도 중심과 줌레벨 설정
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //최단경로//

    //1. 출발지~목적지 최단경로 좌표 가져와서 shortPointList, shortLatLngList에 저장하기
    await DrawLine.getShortPointList(DrawLine.shortPointList, DrawLine.shortLatLngList, origin, destination);
    //2. 최단경로 그리기
    DrawLine.drawLine("short", DrawLine.shortLatLngList);


    //밝은 길//

    //3.목적지 이전까지 탐색하며 우회해야할 경로 확인
    await DrawLine.getNearLightPointList();

    //4. 가로등이 없는 지점에서 새로운 가로등 탐색
    await DrawLine.getNewBoundList(DrawLine.firstDetourStartIndex, DrawLine.firstDetourEndIndex);

    if (DrawLine.aroundLampList.length > 0) {
        //가장 목적지에 가까운 다음 가로등 좌표
        const nextLamp = DrawLine.findShortestLamp();

        if (DrawLine.isDetour) {
            DrawLine.safeLatLngList = DrawLine.shortLatLngList.slice(0, DrawLine.firstDetourStartIndex);
            DrawLine.safePointList.push(DrawLine.shortPointList.slice(0, DrawLine.firstDetourStartIndex)); //이전 최단 경로 저장
            await DrawLine.getShortPointList(DrawLine.safePointList, DrawLine.safeLatLngList, origin, nextLamp);
            await DrawLine.getShortPointList(DrawLine.safePointList, DrawLine.safeLatLngList, nextLamp, destination);
            console.log("safePointList", DrawLine.safePointList);
            console.log("safeLatLngList", DrawLine.safeLatLngList);
        }
    }

    //5. 우회경로 그리기
    DrawLine.drawLine("safe", DrawLine.safeLatLngList);

    await DrawLine.setMapBound();

    return { 'omarker': DrawLine.omarker, 'dmarker': DrawLine.dmarker, 'short': DrawLine.polyline_short, 'safe': DrawLine.polyline_safe };
}

export default getTwoPath;
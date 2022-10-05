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
    DrawLine.shortline = null;
    DrawLine.safeline = null;

    DrawLine.firstDetourStart = {};
    DrawLine.firstDetourEnd = {};
    DrawLine.firstDetourStartIndex = -1;
    DrawLine.firstDetourEndIndex = -1;
    DrawLine.isDetour = false;

    DrawLine.aroundLampList = [];


    DrawLine.distance = function (x1, y1, x2, y2, targetX, targetY) {

        if (x2 - x1 == 0) return -1;
        let m = (y2 - y1) / (x2 - x1);
        let c = y1 - (m * x1);
        let distance = Math.abs(m * targetX - targetY + c) / (Math.sqrt(Math.pow(m, 2) + 1));
        return distance;
    }

    DrawLine.line = function (p1, p2) {
        let A = (p1[1] - p2[1]);
        let B = (p2[0] - p1[0]);
        let C = (p1[0] * p2[1] - p2[0] * p1[1]);
        return [A, B, C];
    }

    DrawLine.intersection = function (L1, L2) {
        let D = L1[0] * L2[1] - L1[1] * L2[0];
        let Dx = L1[2] * L2[1] - L1[1] * L2[2];
        let Dy = L1[0] * L2[2] - L1[2] * L2[0];
        if (D != 0) {
            let x = Dx / D
            let y = Dy / D;
            return [x, y];
        }
        return null;
    }

    DrawLine.getNearLightPointList = async function () {

        await authAxios
            .get(apiPath.bound.get(origin.lat, origin.lon, destination.lat, destination.lon), {})
            .then(res => {
                DrawLine.boundaryPointList = res.data;
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

            let baseDistance = 0.0005; //약 25m
            partialDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + partialDistance;

            //경계 내의 가로등 좌표 중 경계 근처에 있는 것 탐색
            for (const point in DrawLine.boundaryPointList) {

                targetX = point.lon;
                targetY = point.lat;

                let dist = DrawLine.distance(x1, y1, x2, y2, targetX, targetY);

                if (dist < 0) continue;
                if (dist < 0.00013) { //약 15m
                    let m = (y2 - y1) / (x2 - x1);
                    let randomX = targetX - 1;
                    let randomY = -1 / m * randomX + targetY + (targetX / m);

                    let L1 = DrawLine.line([x1, y1], [x2, y2]);
                    let L2 = DrawLine.line([targetX, targetY], [randomX, randomY]);

                    let R = DrawLine.intersection(L1, L2);

                    let R0 = 0;
                    if (R != null) {
                        R0 = R[0];
                    } else {
                        continue;
                    }

                    if ((x1 <= R0 && R0 <= x2) || (x2 <= R0 && R0 <= x1)) {
                        DrawLine.nearLightPointList.push({ targetX, targetY });
                        lampCount += 1;
                    }
                }
            }

            if (partialDistance >= baseDistance || i == DrawLine.shortPointList.length - 2) {
                console.log("[node " + startPoint + 1 + " ~ " + i + 2 + " ] 가로등 갯수 : " + lampCount + "\n");
                if (lampCount < 2) {
                    DrawLine.isDetour = true;
                    console.log("탐색하면 안되는 길 입니다");
                    if (firstPoint) {
                        DrawLine.firstDetourStart = { 'lat': DrawLine.shortPointList[startPoint + 1].lat, 'lon': DrawLine.shortPointList[startPoint + 1].lon };
                        DrawLine.firstDetourEnd = { 'lat': DrawLine.shortPointList[i + 2].lat, 'lon': DrawLine.shortPointList[i + 2].lon };
                        DrawLine.firstDetourStartIndex = startPoint + 1;
                        DrawLine.firstDetourEndIndex = i + 2;
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
        return Math.sqrt(Math.pow(x.lon - y.lat, 2) + Math.pow(x.lat - y.lon, 2));
    }

    DrawLine.pointDistance2 = function (x, y) {
        return Math.sqrt(Math.pow(x.lat - y.lat, 2) + Math.pow(x.lon - y.lon, 2));
    }

    DrawLine.contains = function (arr, val) {
        for (const point in arr) {
            if (point.lat == val.lat && point.lon == val.lon) {
                return true;
            }
        }
        return false;
    }

    DrawLine.remove = function (arr, val) {
        let newarr = [];
        for (const point in arr) {
            if (point.lat == val.lat && point.lon == val.lon) {
                continue;
            }
            newarr.push(point);
        }
        return newarr;
    }

    DrawLine.getNewBoundList = async function (src_idx, dst_idx) {
        DrawLine.aroundLampList = [];

        //다음 경로까지의 길이를 반경 값으로 설정.
        let radius = DrawLine.pointDistance2(DrawLine.boundaryPointList[src_idx], DrawLine.boundaryPointList[dst_idx]) + 0.0005;

        for (const point in DrawLine.boundaryPointList) {
            let dist = DrawLine.pointDistance(point, DrawLine.boundaryPointList[src_idx]);
            if (dist <= radius && DrawLine.contains(DrawLine.nearLightPointList, point) === false) {
                DrawLine.aroundLampList.push(point);
            }
        }

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

        for (const point in DrawLine.aroundLampList) {
            let dist = DrawLine.pointDistance2(DrawLine.firstDetourStart, point)
            if (maxCost < dist) {
                maxCost = dist;
                result = point;
            }
        }

        return result;
    }

    DrawLine.drawLine = function (type, arrPointList) {

        if (type === "short") {
            const polyline_ = new Tmapv2.Polyline({
                path: arrPointList,
                strokeColor: "#DD0000",
                strokeWeight: 6,
                map: DrawLine.map,
            });
            DrawLine.shortline = polyline_;
        } else if (type === "safe") {
            const polyline_ = new Tmapv2.Polyline({
                path: arrPointList,
                strokeColor: "#0067a3",
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

        }).catch(res => console.log(res));

    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //최단경로//

    //1. 출발지~목적지 최단경로 좌표 가져와서 shortPointList, shortLatLngList에 저장하기
    await DrawLine.getShortPointList(DrawLine.shortPointList, DrawLine.shortLatLngList, origin, destination);

    //밝은 길//

    //2.목적지 이전까지 탐색하며 우회해야할 경로 확인
    await DrawLine.getNearLightPointList();

    //2. 가로등이 없는 지점에서 새로운 가로등 탐색
    await DrawLine.getNewBoundList(DrawLine.firstDetourStartIndex, DrawLine.firstDetourEndIndex);

    if (DrawLine.aroundLampList.length > 0) {
        //가장 목적지에 가까운 다음 가로등 좌표
        const nextLamp = DrawLine.findShortestLamp();

        if (DrawLine.isDetour) {
            DrawLine.safeLatLngList.push(DrawLine.shortLatLngList.slice(0, DrawLine.firstDetourStartIndex));
            DrawLine.safePointList.push(DrawLine.shortPointList.slice(0, DrawLine.firstDetourStartIndex)); //이전 최단 경로 저장
            await DrawLine.getShortPointList(DrawLine.safePointList, DrawLine.safeLatLngList, nextLamp, destination);
        }
    }


    //그리기
    //1. 최단경로
    DrawLine.drawLine("short", DrawLine.shortLatLngList);
    //2. 우회경로
    DrawLine.drawLine("safe", DrawLine.safeLatLngList);
}

export default getTwoPath;
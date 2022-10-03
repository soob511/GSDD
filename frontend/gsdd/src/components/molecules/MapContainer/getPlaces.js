import axios from 'axios';

const getPlaces = async (newInput) => {

    const { Tmapv2 } = window;

    const places = [];

    console.log(newInput);
    const headers = {
        'appKey': 'l7xxd1c2344c5b154c50a810779b023d8b97',
    }
    const data = await axios({
        method: "GET",
        headers: headers,
        url: "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&appKey=l7xxd1c2344c5b154c50a810779b023d8b97&count=10&searchKeyword=" + newInput + "&resCoordType=EPSG3857&searchType=all&reqCoordType=WGS84GEO&callback=result",
        async: false,
    }).then(res => {
        console.log(res);
        const resultpoisData = res.data.searchPoiInfo.pois.poi;
        console.log(resultpoisData);

        for (const k in resultpoisData) {

            var noorLat = Number(resultpoisData[k].noorLat);
            var noorLon = Number(resultpoisData[k].noorLon);
            var name = resultpoisData[k].name;

            var pointCng = new Tmapv2.Point(noorLon, noorLat);
            var projectionCng = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(pointCng);

            var lat = projectionCng._lat;
            var lon = projectionCng._lng;

            places.push({
                name: name,
                lat: lat,
                lng: lon,
            });
        }

        console.log(places);

    }).catch(res => console.log(res));

    return places;

};

export default getPlaces;
import axios from 'axios';
import apiPath from '../../../common/apiPath';
import light from '../../../assets/light.png';

const getMarkers = async (Tmapv2, map, lat, lng) => {
    // try {
    //     const { data } = await axios({
    //         method: 'GET',
    //         url: apiPath.user.get(lat, lng),
    //     });
    //     return data;

    // } catch (error) {
    //     console.log(error);
    // }
    const data = {
        lights: [
            { lat: 36.3487997, lng: 127.2931364 },
            { lat: 36.35026381, lng: 127.2967196 },
            { lat: 36.35026312, lng: 127.2967196 },
            { lat: 36.35029652, lng: 127.2967196 },
            { lat: 36.34998919, lng: 127.2955892 },
            { lat: 36.34608603, lng: 127.2904402 },
            { lat: 36.34645222, lng: 127.2909345 },
            { lat: 36.34699691, lng: 127.2921281 },
            { lat: 36.34682097, lng: 127.2928733 },
            { lat: 36.34761083, lng: 127.2921453 },
            { lat: 36.34796364, lng: 127.2919324 },
            { lat: 36.34788362, lng: 127.2913322 },
            { lat: 36.34718496, lng: 127.2929103 },
            { lat: 36.34782621, lng: 127.2933037 },
            { lat: 36.348519, lng: 127.2935588 },
            { lat: 36.348409, lng: 127.293027 },
            { lat: 36.34836165, lng: 127.2926077 },
            { lat: 36.34781475, lng: 127.2922631 },
            { lat: 36.34907281, lng: 127.2929198 },
            { lat: 36.34898345, lng: 127.2928188 },
            { lat: 36.34922338, lng: 127.2925466 },
            { lat: 36.34945821, lng: 127.2933397 },
            { lat: 36.34944986, lng: 127.2931082 },
            { lat: 36.34959795, lng: 127.2921749 },
            { lat: 36.34957691, lng: 127.293887 },
            { lat: 36.3498962, lng: 127.2932591 },
            { lat: 36.35014504, lng: 127.2931125 },
            { lat: 36.34957691, lng: 127.293881 },
            { lat: 36.34979827, lng: 127.2944208 },
            { lat: 36.34979827, lng: 127.2944853 },
            { lat: 36.34995765, lng: 127.2949164 },
            { lat: 36.34848411, lng: 127.2959035 },
            { lat: 36.34852241, lng: 127.2956507 },
            { lat: 36.34857895, lng: 127.2954543 },
            { lat: 36.34903733, lng: 127.2944882 },
            { lat: 36.34951654, lng: 127.2948296 },
            { lat: 36.34702793, lng: 127.2908499 },
            { lat: 36.3482626, lng: 127.2922077 },
            { lat: 36.34779469, lng: 127.2928043 },
            { lat: 36.34897889, lng: 127.295098 },
            { lat: 36.34924814, lng: 127.2925701 },
            { lat: 36.35609631, lng: 27.3003642 },],
        cameras: [
            { lat: 36.3581097, lng: 127.3026793 },
            { lat: 36.3584609, lng: 127.3068557 },
            { lat: 36.3584609, lng: 127.3068557 },
            { lat: 36.3574333, lng: 127.3071856 },
            { lat: 36.3578496, lng: 127.3088553 },
            { lat: 36.35723315, lng: 127.3089863 },
            { lat: 36.356398, lng: 127.3102638 },
            { lat: 36.3597505, lng: 127.3028727 },
            { lat: 36.3603504, lng: 127.3044971 },
            { lat: 36.3577702, lng: 127.3040773 },
            { lat: 36.3573728, lng: 127.3047559 },
            { lat: 36.3565665, lng: 127.308061 },
            { lat: 36.3561005, lng: 127.3088288 },
            { lat: 36.3456593, lng: 127.2948385 },
            { lat: 36.347083, lng: 127.301736 },
            { lat: 36.3484287, lng: 127.293024 },
            { lat: 36.3458142, lng: 127.2890857 },
            { lat: 36.34996031, lng: 127.2955848 },
            { lat: 36.3607111, lng: 127.3012448 },
        ],
        houses: [
            { lat: 36.346677, lng: 127.301138, name: '위드미편의점 유성덕명점', contact: '042-472-7000' },
            { lat: 36.348583, lng: 127.2987924, name: 'GS25 한밭대학사점', contact: '042-826-2515' },
            { lat: 36.344977, lng: 127.304819, name: 'GS25 한밭대후문점', contact: '042-826-6931' },
        ],
    };

    const markers = {};
    markers.lights = [];
    markers.cameras = [];
    markers.houses = [];

    for (const val of data.lights) {
        const location = new Tmapv2.LatLng(val.lat, val.lng);
        console.log(location);
        const marker = new Tmapv2.Marker({
            icon: light,
            position: location,
        });
        markers.lights.push(marker);
        marker.setMap(map);
    }

    // data.lights.forEach(function (lat, lng) {
    //     const location = new Tmapv2.LatLng(lat, lng);
    //     console.log(location);
    //     const marker = new Tmapv2.Marker({
    //         icon: light,
    //         position: location,
    //     });
    //     markers.lights.push(
    //         marker
    //     );
    //     marker.setMap(map);
    // });
    return markers;
};

export default getMarkers;
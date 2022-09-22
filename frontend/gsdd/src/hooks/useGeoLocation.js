import React, { useEffect, useState } from 'react';


const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coords: { lat: "", lng: "" }
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coords: {
                lat: location.coords.lat,
                lng: location.coords.lng,
            },
        });
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
}

export default useGeoLocation;
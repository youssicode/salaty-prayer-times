//? Imported Modules
//==================
import errorHandler from "./errorHandler.js"
import { renderMosquesList } from "./dataRendering.js"

//? Functions
//===========
const getNearbyMosquesList = async (coords) => {
    if (!coords) {
        const locationError = new Error("Location shoud be defined first.")
        locationError.code = 88
        errorHandler(locationError)
        return
    }
    const mosquesList = await fetchMosquesList(coords)
    if (mosquesList) {
        renderMosquesList(mosquesList, coords)
    }
}

async function fetchMosquesList(coords) {
    try {
        const options = {
            method: 'GET',
            url: '/places',
            params: {
                lat: coords.latitude,
                lng: coords.longitude
            }
        };
        const { data: { results } } = await axios.request(options)
        return results.slice(0, 6)
        // const response = await axios.request(options)
        // return response.data.results.slice(0, 6)
    } catch (err) {
        errorHandler(err)
    }
}

// Calculate the distance between two positions using "Heversine Formula"
export const haversineCalcDistance = ([lat1, long1], [lat2, long2]) => {
    const toRadian = angle => angle * (Math.PI / 180);
    const distanceAB = (a, b) => (a - b) * (Math.PI / 180);
    const earth_radius_km = 6371;

    const dLat = distanceAB(lat2, lat1);
    const dLon = distanceAB(long2, long1);
    // convert latitudes to Radian
    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = earth_radius_km * c;

    return Math.round(finalDistance * 1000); // in meters
};



export default getNearbyMosquesList
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
    const mosques_lists = await fetchMosquesList(coords)
    if (mosques_lists) {
        renderMosquesList(mosques_lists)
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
        const { data } = await axios.request(options)
        return data
    } catch (err) {
        errorHandler(err)
    }
}


export default getNearbyMosquesList
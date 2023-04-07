//? Imported Modules
//==================

import errorHandler from "./errorHandler.js";
import saveToLocalStorage from "./saveToLocalStorage.js";
import { renderAutoLocatedCity } from "./dataRendering.js";

//? Functions
//===========

//* Get the User's geolocation coordinates
export async function getUserCoordinates() {
    try {
        let position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                pos => resolve(pos), // Success CallBack Method's parameter
                err => reject(err),  // Error CallBack Method's parameter
                { timeout: 10000 }
            )
            //* OR simply:
            //* navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    } catch (err) {
        errorHandler(err)
    }
}

export async function autoLocateCity(coords) {
    try {
        const localAdresse = await getAdresse(coords.latitude, coords.longitude) || { cityName: "Location Undetectable", countryShortName: "" }
        saveToLocalStorage('salaty_localAdresse', localAdresse)
        renderAutoLocatedCity(localAdresse)
    } catch (err) {
        errorHandler(err)
    }
}

//* Reverse Geocoding API
export async function getAdresse(lat, long) {
    try {
        const latLongUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`;
        let response = await axios({
            method: "GET",
            url: latLongUrl,
        })
        const adressedata = await response.data
        const localAdresse = {
            cityName: adressedata.city ? adressedata.city : adressedata.locality ? adressedata.locality : "Unknown area",
            countryName: adressedata.countryName,
            countryShortName: adressedata.countryCode
        }
        return localAdresse
    } catch (err) {
        errorHandler(err)
    }
}
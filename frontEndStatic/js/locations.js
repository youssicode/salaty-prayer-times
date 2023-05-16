//? Imported Modules
//==================

import errorHandler from "./errorHandler.js"
import { saveToLocalStorage, getDataFromLocalStorage } from "./localStorage.js"
import { renderAutoLocatedCity } from "./dataRendering.js"
import dom from "./domElements.js";


//? Functions
//===========

//* Get the User's geolocation coordinates
export async function getUserCoordinates() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve, // Success CallBack Method's parameter (resolve == 'pos => resolve(pos)')
                reject,  // Error CallBack Method's parameter (resolve == 'err => reject(err)')
                {
                    enableHighAccuracy: true, // The enableHighAccuracy option to true so that the device uses GPS instead of other methods to determine its location.
                    timeout: 7000,
                    maximumAge: 0
                } // The maximumAge option is used to provide a hint to the browser on how old a cached position result can be used. When a user requests the current position, the browser can return a cached result if it's available and no new position is available. Setting maximumAge to 0 indicates that the browser should not use any cached result and it should always try to get a fresh position result.
            )
        })
        // Distructure position's lat/long
        const { coords: { latitude, longitude } } = position;

        return { latitude, longitude }
    } catch (err) {
        errorHandler(err)
    }
}

// Automatically locate city based on user's geolocation
export async function autoLocateCity({ latitude, longitude }) {
    try {
        const localAdresse = await getAdresse(latitude, longitude) || { cityName: "Location Undetectable", countryShortName: "" }
        saveToLocalStorage('salaty_localAdresse', localAdresse)
        renderAutoLocatedCity(localAdresse)
    } catch (err) {
        errorHandler(err)
    }
}

//* Reverse Geocoding API
export async function getAdresse(lat, lng) {
    try {
        const { data } = await axios.get("/reverse-geocode", { params: { lat, lng } })
        return data
    } catch (err) {
        errorHandler(err)
    }
}

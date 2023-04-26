//? Imported Modules
//==================
import { renderPrayerTiming } from "./dataRendering.js";
import { saveToLocalStorage, getDataFromLocalStorage } from "./saveToLocalStorage.js";
import errorHandler from "./errorHandler.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";


//? Functions
//===========
export async function getPrayerTimes(coords) {
    try {
        const fetchedPrayerTimes = await fetchPrayerTimesByLocationCoordinates(coords.latitude, coords.longitude);
        saveToLocalStorage('prayerTimings', fetchedPrayerTimes)
        renderPrayerTiming(fetchedPrayerTimes)
        renderUpcomingPrayerCard(fetchedPrayerTimes, getDataFromLocalStorage('salaty_localTimeZone'))
    } catch (err) {
        errorHandler(err)
    }
}

//* Getting the prayer times based on geolocation (Latitude/Longitude) coordinates
async function fetchPrayerTimesByLocationCoordinates(x, y) {
    const { status, data } = await axios.get('/prayer-timings', { params: { x, y } })
    if (status >= 200 && status < 300) {
        return data
    } else {
        let err = new Error("Prayer times unavailable!")
        err.code = 77
        throw err
    }
}

//* Geting the prayer times by specific city
export async function prayerTimesByCity(city, country) {
    const { status, data } = await axios.get('/prayer-timings-by-city', { params: { city, country } })
    if (status >= 200 && status < 300) {
        return data
    } else {
        let err = new Error("Prayer times unavailable!")
        err.code = 77
        throw err
    }
}

export async function refreshPrayerTimingForChosenCity(chosenCity) {
    try {
        const city = chosenCity.slice(0, -4)
        const country = chosenCity.slice(-2)
        const { mainPrayerTimings, newCityCoords, city_time_zone, newHijriDate } = await prayerTimesByCity(city, country)
        saveToLocalStorage('prayerTimings', mainPrayerTimings)
        saveToLocalStorage('locationCoordinates', newCityCoords)
        renderPrayerTiming(mainPrayerTimings)
        return { newHijriDate, city_time_zone }
    } catch (err) {
        errorHandler(err)
    }
}
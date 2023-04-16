//? Imported Modules
//==================
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import { renderPrayerTiming } from "./dataRendering.js";
import errorHandler from "./errorHandler.js";


//? Functions
//===========

//* Save fetched prayer times data in an array

export const extractMainPrayerTimes = (times) => {
    const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = times;
    const prayerTimings = [
        { prayerName: 'Fajr', prayerTime: Fajr.slice(0, 5) },
        { prayerName: 'Sunrise', prayerTime: Sunrise.slice(0, 5) },
        { prayerName: 'Dhuhr', prayerTime: Dhuhr.slice(0, 5) },
        { prayerName: 'Asr', prayerTime: Asr.slice(0, 5) },
        { prayerName: 'Maghrib', prayerTime: Maghrib.slice(0, 5) },
        { prayerName: 'Isha', prayerTime: Isha.slice(0, 5) },
    ];
    return prayerTimings;
}

//* Getting the prayer times based on geolocation (Latitude/Longitude) coordinates
export async function prayerTimesByLocationCoordinates(x, y) {
    const dateTimeStamp = Math.floor(Date.now() / 1000)
    const apiUrl = `https://api.aladhan.com/v1/timings/${dateTimeStamp}?latitude=${x}&longitude=${y}&method=3`
    const response = await axios.get(apiUrl)
    if (response.status >= 200 && response.status < 300) {
        return response.data.data
    } else {
        let err = new Error("Prayer times unavailable!")
        err.code = 77
        throw err
    }
}

//* Geting the prayer times by specific city
export async function prayerTimesByCity(city, country) {
    try {
        const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=3`
        const { data } = await axios.get(apiUrl)
        return data
    } catch (err) {
        throw err
    }
}

export async function refreshPrayerTimingForChosenCity(chosenCity) {
    try {
        const city = chosenCity.slice(0, -4)
        const country = chosenCity.slice(-2)
        const { data: { timings, meta, date } } = await prayerTimesByCity(city, country)
        const fetchedPrayerTimesByCity = extractMainPrayerTimes(timings)
        renderPrayerTiming(fetchedPrayerTimesByCity)
        renderUpcomingPrayerCard(fetchedPrayerTimesByCity)
        ///////////////////////////
        // const dateOfselectedCity = date.readable
        // const timeZoneOfselectedCity = meta.timezone
        // renderUpcomingPrayerCard(fetchedPrayerTimesByCity, dateOfselectedCity, timeZoneOfselectedCity)
        ///////////////////////////
        return { meta, date }
    } catch (err) {
        errorHandler(err)
    }
}
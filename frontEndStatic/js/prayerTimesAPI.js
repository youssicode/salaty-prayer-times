//? Imported Modules
//==================

import { displayTime } from "./index.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import { renderPrayerTiming, renderGregorianDate } from "./dataRendering.js";
import errorHandler from "./errorHandler.js";
import saveToLocalStorage from "./saveToLocalStorage.js";


//? Functions
//===========

//* Save fetched prayer times data in an array
// export const extractMainPrayerTimes = (apiResponse) => {
//     const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = apiResponse.timings;
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

//* Geting the prayer times by specific city
export async function prayerTimesByCity(city, country, day, month, year) {
    try {
        const apiUrl = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=3&month=${month}&year=${year}`
        const { data: { data } } = await axios.get(apiUrl)
        return data[day - 1]
        // const apiUrl = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=3&month=${month}&year=${year}`
        // const response = await axios.get(apiUrl)
        // return response.data.data[day - 1]
    } catch (err) {
        throw err
    }
}

//* Getting the prayer times based on geolocation (Latitude/Longitude) coordinates
export async function prayerTimesByLocationCoordinates(x, y) {
    const dateTimeStamp = Math.floor(Date.now() / 1000)
    const apiUrl = `https://api.aladhan.com/v1/timings/${dateTimeStamp}?timezone=America/Toronto&latitude=${x}&longitude=${y}&method=3`
    const response = await axios.get(apiUrl)
    if (response.status >= 200 && response.status < 300) {
        return response.data.data
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
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const { meta, timings } = await prayerTimesByCity(city, country, day, month, year)
        const newCityCoords = {
            latitude: meta.latitude,
            longitude: meta.longitude
        }
        //* refresh Current Time
        const local_time_zone = meta.timezone
        displayTime(local_time_zone)
        
        //* refresh Current Gregorian Date
        refreshGregorianDate(local_time_zone)

        saveToLocalStorage('locationCoordinates', newCityCoords)
        const fetchedPrayerTimesByCity = extractMainPrayerTimes(timings)
        renderPrayerTiming(fetchedPrayerTimesByCity)
        renderUpcomingPrayerCard(fetchedPrayerTimesByCity)
    } catch (err) {
        errorHandler(err)
    }
}

const refreshGregorianDate = (time_zone)=> {
    const options = {
        timeZone: time_zone,
    };
    const new_zone_date_string = new Date().toLocaleString('en-US', options)
    const date = new Date(new_zone_date_string)
    renderGregorianDate(date)
}
      
    //   // example usage
    //   const localTime = getLocalTime('UTC');
    //   console.log(localTime); // output: "Monday, August 23, 2021, 4:56:09 PM"
      

// export async function refreshPrayerTimingForChosenCity(chosenCity) {
//     try {
//         const city = chosenCity.slice(0, -4)
//         const country = chosenCity.slice(-2)
//         const date = new Date()
//         const day = date.getDate()
//         const month = date.getMonth() + 1
//         const year = date.getFullYear()
//         const prayerTimesByCityResponse = await prayerTimesByCity(city, country, day, month, year)
//         const newCityCoords = {
//             latitude: prayerTimesByCityResponse.meta.latitude,
//             longitude: prayerTimesByCityResponse.meta.longitude
//         }
//         saveToLocalStorage('locationCoordinates', newCityCoords)
//         const fetchedPrayerTimesByCity = extractMainPrayerTimes(prayerTimesByCityResponse)
//         renderPrayerTiming(fetchedPrayerTimesByCity)
//         renderUpcomingPrayerCard(fetchedPrayerTimesByCity)
//     } catch (err) {
//         errorHandler(err)
//     }
// }
import * as dom from "./domElements.js";

// Geting the prayer times by specific city

export async function prayerTimesByCity(city, country, day, month, year) {
    try {
        let apiUrl = `http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=3&month=${month}&year=${year}`
        let response = await axios({
            method: "GET",
            url: apiUrl,
        })
        return response.data.data[day - 1]
    } catch (err) {
        throw err
    }
}

//* Getting the prayer times based on geolocation (Latitude/Longitude) coordinates

export async function prayerTimesByLocationCoordinates(x, y, date) {
    let apiUrl = `http://api.aladhan.com/v1/timings/${date.day}-${date.month}-${date.year}?latitude=${x}&longitude=${y}&method=3`
    let response = await axios({
        method: "GET",
        url: apiUrl,
    })
    if (response.status >= 200 && response.status < 300) {
        return response.data.data
    } else {
        throw Error
    }
}

//* Display feched prayer times data

export const displayPrayerTiming = (prayerTimingResponse) => {
    dom.fajrTimeLabel.innerText = prayerTimingResponse.timings.Fajr.slice(0, 5)
    dom.sunriseTimeLabel.innerText = prayerTimingResponse.timings.Sunrise.slice(0, 5)
    dom.dhuhrTimeLabel.innerText = prayerTimingResponse.timings.Dhuhr.slice(0, 5)
    dom.asrTimeLabel.innerText = prayerTimingResponse.timings.Asr.slice(0, 5)
    dom.maghribTimeLabel.innerText = prayerTimingResponse.timings.Maghrib.slice(0, 5)
    dom.ishaaTimeLabel.innerText = prayerTimingResponse.timings.Isha.slice(0, 5)
}
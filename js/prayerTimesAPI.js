import * as dom from "./domElements.js";

//* Save fetched prayer times data in an array

export const savePrayerTiming = (apiResponse) => {
    const fetchedPrayerTimesArray = [
        { prayerName: 'Fajr', prayerTime: apiResponse.timings.Fajr.slice(0, 5) },
        { prayerName: 'Sunrise', prayerTime: apiResponse.timings.Sunrise.slice(0, 5) },
        { prayerName: 'Dhuhr', prayerTime: apiResponse.timings.Dhuhr.slice(0, 5) },
        { prayerName: 'Asr', prayerTime: apiResponse.timings.Asr.slice(0, 5) },
        { prayerName: 'Maghrib', prayerTime: apiResponse.timings.Maghrib.slice(0, 5) },
        { prayerName: 'Ishaa', prayerTime: apiResponse.timings.Isha.slice(0, 5) }
    ]
    return fetchedPrayerTimesArray
}

//* Geting the prayer times by specific city

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

export async function prayerTimesByLocationCoordinates(x, y) {
    const dateTimeStamp = Math.floor(Date.now() / 1000)
    let apiUrl = `http://api.aladhan.com/v1/timings/${dateTimeStamp}?timezone=America/Toronto&latitude=${x}&longitude=${y}&method=3`
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

export const renderPrayerTiming = (prayerTimingArray) => {

    const prayerTimeLabels = document.querySelectorAll(".prayerTimeCard__prayerTime")
    for (let i = 0; i < prayerTimeLabels.length; i++) {
        prayerTimeLabels[i].innerText = prayerTimingArray[i].prayerTime
    }
}
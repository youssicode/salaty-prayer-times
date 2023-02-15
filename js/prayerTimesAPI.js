
// Geting the prayer times by specific city
export async function prayerTimesByCity(zone, month, year) {
    try {
        let apiUrl = `http://api.aladhan.com/v1/calendarByCity?city=${zone.cityLongName}&country=${zone.countryLongName}&method=3&month=${month}&year=${year}`
        console.log(apiUrl)
        let response = await axios({
            method: "GET",
            url: apiUrl,
        })
        return response.data.data
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

//* Transforming gregorian date to Hijri date

export async function getHijriCalendar(gregorian) {
    let apiUrl = `http://api.aladhan.com/v1/gToH?date=${gregorian}`
    let response = await axios({
        method: "GET",
        url: apiUrl,
    })
    if (response.status >= 200 && response.status < 300) {
        return response.data.data.hijri
    } else {
        throw Error
    }

}

// Geting the prayer times by specific city
export async function prayerTimesByCity(zone, date) {

    let apiUrl = `http://api.aladhan.com/v1/calendarByCity?city=${zone.city}&country=${zone.country}&method=3&month=${date.month}&year=${date.year}`
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

//* Geting the client's geolocation coordinates

export async function getClientLocationCoordinates() {
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            pos => resolve(pos), // Success CallBack Method's parameter
            err => reject(err)  // Error CallBack Method's parameter
        )
        //* OR simply:
        //* navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
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

//* Geocoding API

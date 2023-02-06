
// Geting the prayer times by specific city
export async function getPrayerTimesByCityResult(zone, date) {

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

// Geting the client geographical position
async function getClientPosition() {
    try {
        let clientGeoPosition = {}
        await navigator.geolocation.getCurrentPosition(myPosition => {
            clientGeoPosition.latitude = myPosition.coords.latitude
            clientGeoPosition.longitude = myPosition.coords.longitude
        })
        return clientGeoPosition
    } catch (err) {
        alert("Unable to auto locate your position.")
    }
}

// Geting the prayer times by geolocation (Latitude/Longitude)
export async function getPrayerTimesByGeolocationResult(date) {
    let coordinates = await getClientPosition()
    console.log(coordinates)
    let apiUrl = `http://api.aladhan.com/v1/timings/${date.day}-${date.month}-${date.year}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&method=3`
    console.log(apiUrl)
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

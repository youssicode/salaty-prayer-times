
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

export async function getClientPosition() {
    try {
        let position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                pos => resolve(pos), // Success CallBack Method parameter
                err => reject(err)  // Error CallBack Method parameter
            )
            //* OR simply:   
            //* navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    } catch (err) {
        throw err
    }
}

// Geting the prayer times by geolocation (Latitude/Longitude)
export async function getPrayerTimesByAutolocationResult(date) {
    let coordinates = await getClientPosition()
    let apiUrl = `http://api.aladhan.com/v1/timings/${date.day}-${date.month}-${date.year}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&method=3`
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

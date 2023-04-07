//? Functions
//===========

//* Save fetched prayer times data in an array
export const extractMainPrayerTimes = (apiResponse) => {
    const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = apiResponse.timings;
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
        const response = await axios.get(apiUrl)
        return response.data.data[day - 1]
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
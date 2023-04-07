// Get data  from Local Storage
const saveToLocalStorage = (key, data) => {
    // const locationInfos = {
    //     coords: { latitude: 34.45645, longitude: -5.64545 },
    //     city_name: "",
    //     prayers_timing: [
    //         { prayerName: 'Fajr', prayerTime: "--:--" },
    //         { prayerName: 'Sunrise', prayerTime: "--:--" },
    //         { prayerName: 'Dhuhr', prayerTime: "--:--" },
    //         { prayerName: 'Asr', prayerTime: "--:--" },
    //         { prayerName: 'Maghrib', prayerTime: "--:--" },
    //         { prayerName: "Isha'a", prayerTime: "--:--" }
    //     ]
    // }
    let salatyAppInfos = JSON.parse(localStorage.getItem("salaty_prayer_times_infos")) || {}
    salatyAppInfos[key] = data
    localStorage.setItem("salaty_prayer_times_infos", JSON.stringify(salatyAppInfos))
}

// Get data  from Local Storage
const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export default saveToLocalStorage
export { getFromLocalStorage }
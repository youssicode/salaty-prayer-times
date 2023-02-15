// Import Axios Module
// const axios = require('axios') // Work with node.js but NOT with v. javascript in front-end

// Imported Functions
import { prayerTimesByCity, prayerTimesByLocationCoordinates, getHijriCalendar } from "./prayerTimesAPI.js";
import { getUserLocationCoordinates } from "./autoLocationAPI.js";
import { getAdresse } from "./GoogleMapGeoAPI.js";
import { getCities, getCountries } from "./countriesAndCitiesAPI.js";
import { clearCitiesList, citySearchInput } from "./autoCompleteCitiesList.js";
// Import an entire module for side effects only, without importing anything.
// This runs the module's global code, but doesn't actually import any values.
// Example: If we run autoCompleteCitiesList() here it won't work because its not defined
import "./autoCompleteCitiesList.js";

const actualLocationLabel = document.querySelector(".location__actual-location-wrapper__cityName")
const autoLocateButton = document.querySelector(".auto-locate-button")
const hijriDateLabel = document.querySelector(".hijri_date")
const gregorianDateLabel = document.querySelector(".gregorian_date")


window.onload = () => {
    //* Display Date
    displayHijriCalendar()
    //* Display auto Located City
    autoLocate()
}

const date = new Date()
const toDay = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
}

//* Get and display Hijri Date

const displayHijriCalendar = async () => {
    // let gregorian = new Date().toLocaleDateString().replaceAll('/', '-')
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const myDate = new Date();
    const grego_date = `${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    gregorianDateLabel.textContent = `${myDate.getDate()} ${monthsList[myDate.getMonth() + 1]} ${myDate.getFullYear()}`
    try {
        const hijriToDayResult = await getHijriCalendar(grego_date)
        const hijriToDay = `${daysOfTheWeek[myDate.getDay()]}, ${hijriToDayResult.day}  ${hijriToDayResult.month.en}  ${hijriToDayResult.year}`
        hijriDateLabel.innerText = hijriToDay

    } catch (err) {
        errorHandler(err)
    }
}

/*
{
    "date": "24-07-1444",
    "format": "DD-MM-YYYY",
    "day": "24",
    "weekday": {
        "en": "Al Arba'a",
        "ar": "الاربعاء"
    },
    "month": {
        "number": 7,
        "en": "Rajab",
        "ar": "رَجَب"
    },
    "year": "1444",
    "designation": {
        "abbreviated": "AH",
        "expanded": "Anno Hegirae"
    },
    "holidays": []
}
*/

//* Assign Year in the Footer Dinamically
document.querySelector(".actual-year").textContent = toDay.year

//*  Get prayer times By auto locate the user's position coordinates

// const getPrayerTimesByLocationCoordinates = async () => {
//     try {
//         let coordinates = await getUserLocationCoordinates()
//         //? Result to manipulate & use
//         console.log(await prayerTimesByLocationCoordinates(coordinates.latitude, coordinates.longitude, date))
//     } catch (err) {
//         errorHandler(err)
//     }
// }

//* Get the ocal adresse by "Reverse Geocoding" (from user's position coordinates)

// let zoneInfos = {}
const autoLocatedCity = async () => {
    try {
        const coordinates = await getUserLocationCoordinates()
        const zoneInfos = await getAdresse(coordinates.latitude, coordinates.longitude)
        return [coordinates, zoneInfos]

    } catch (err) {
        errorHandler(err)
    }
}

autoLocateButton.onclick = () => {
    autoLocate()
}

const autoLocate = async () => {
    let [coords, localZone] = await autoLocatedCity()
    if (!localZone) return
    const cityCountryName = `${localZone.cityLongName}, ${localZone.countryShortName ? localZone.countryShortName : localZone.countryLongName}`
    actualLocationLabel.innerText = cityCountryName
    // getPrayerTimesByCity(localZone, toDay)
    const apiResponse = await prayerTimesByLocationCoordinates(coords.latitude, coords.longitude, toDay)
    displayPrayerTiming(apiResponse)
}

//* Get prayer times By specifying a city

const getPrayerTimesByCity = async (zone, date) => {
    try {
        console.log(await prayerTimesByCity(zone, date.month, date.year))
        const apiResponse = await prayerTimesByCity(zone, date.month, date.year)
        displayPrayerTiming(apiResponse)
    } catch (err) {
        errorHandler(err)
    }
}

const displayPrayerTiming = (prayerTimingResponse) => {
    const fajrTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.fajr")
    fajrTimeLabel.innerText = prayerTimingResponse[toDay.day - 1].timings.Fajr.slice(0, 5)
    const sunriseTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.sunrise")
    sunriseTimeLabel.innerText = prayerTimingResponse[toDay.day - 1].timings.Sunrise.slice(0, 5)
    const dhuhrTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.dhuhr")
    dhuhrTimeLabel.innerText = prayerTimingResponse[toDay.day - 1].timings.Dhuhr.slice(0, 5)
    const asrTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.asr")
    asrTimeLabel.innerText = prayerTimingResponse[toDay.day - 1].timings.Asr.slice(0, 5)
    const maghribTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.maghrib")
    maghribTimeLabel.innerText = prayerTimingResponse[toDay.day - 1].timings.Maghrib.slice(0, 5)
    const ishaaTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.ishaa")
    ishaaTimeLabel.innerText = prayerTimingResponse[toDay.day - 1].timings.Isha.slice(0, 5)

}
//* Errors Handler Function

const errorHandler = (error) => {
    console.log(error)
    let errorMessage = "Unknown error."
    switch (error.code) {

        case 'ERR_NETWORK':
            errorMessage = "Network Error."
            break;
        case 'ERR_BAD_REQUEST':
            errorMessage = "Bad request. Unkown area or bad parameters."
            break;
        case 1:
            errorMessage = "Permission denied. Please allow the app to access your location or enter a city manually."
            actualLocationLabel.innerText = 'Undetected Location'
            break;
        case 2:
            errorMessage = "Location unavailable."
            actualLocationLabel.innerText = 'Location unavailable'
            break;
        case 3:
            errorMessage = "Request timeout."
            actualLocationLabel.innerText = 'Location unavailable'
            break;
        case 3:
            errorMessage = "Request timeout."
            break;
    }
    alert("Oups! " + errorMessage)
}

//* Get Countries List



//* Get Countries List

const getCountriesList = async () => {
    let countriesList = await getCountries()
    //List of Countries in Array Object
    console.log(countriesList)
}

//* Get Cities List From specifyed Country Name

const getCitiesFromCountryName = async (countryName) => {
    let citiesList = await getCities(countryName)
    //List of cities in Array Object
    console.log(citiesList)
}

//* Display city search component

const locationSearchWrapper = document.querySelector(".location__search-wrapper")
const locationBtn = document.querySelector(".location")

locationBtn.onclick = () => {
    locationSearchWrapper.classList.add("city-search-component-activated")
}

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        hideLocationSearchWrapper()
    }
})
window.addEventListener("click", e => {
    // if the element we clicked on = (e.target) is child of "locationBtn" then return, if not, then execute hideLocationSearchWrapper()
    if (locationBtn.contains(e.target)) return
    hideLocationSearchWrapper()
})

const hideLocationSearchWrapper = () => {
    locationSearchWrapper.classList.remove("city-search-component-activated")
    citySearchInput.value = ''
    clearCitiesList()
}
//* Activate Auto Complete service





//* Create an array of all countries with cities list

// const saveCountriesTable = async () => {
//     let countriesList = await getCountries()
//     let countriesTable = []
//     countriesList.forEach(el => {
//         const entry = {
//             country: el.country,
//             cities: el.cities
//         }
//         countriesTable.push(entry)
//     });
//     return countriesTable
// }
// console.log(await saveCountriesTable())

//* Create an array of all Cities with country name

// const saveCitiesTable = async () => {
//     let countriesList = await getCountries()
//     let citiesTable = []
//     // console.log(countriesList)
//     countriesList.forEach(el => {
//         for (let i = 0; i < el.cities.length; i++) {
//             const entry = `${el.cities[i]}, ${el.country}`
//             citiesTable.push(entry)
//         }
//     });
//     return citiesTable
// }
// console.log(await saveCitiesTable())



// getCountriesList()
// getCitiesFromCountryName("Morocco")
// autoLocatedCity()
// getPrayerTimesByCity()
// getPrayerTimesByLocationCoordinates() //! window.onload = getPrayerTimesByGeolocation()



// console.log(myDate)
// console.log(myDate.toLocaleDateString())
// console.log(myDate.toJSON())
// console.log(myDate.toJSON().slice(0, 10))
// console.log(myDate.getDay()) // 2 = Tuesday


// console.log(myDate.getDate()) // 7 = day number
// console.log(myDate.getMonth()) // 2 = month number (0 = Jan, 1= Feb)
// console.log(myDate.getFullYear()) // 2023
// Import Axios Module
// const axios = require('axios') // Work with node.js but NOT with v. javascript in front-end

// Imported Functions
import { prayerTimesByCity, prayerTimesByLocationCoordinates } from "./prayerTimesAPI.js";
import { getUserLocationCoordinates } from "./autoLocationAPI.js";
import { getAdresse } from "./GoogleMapGeoAPI.js";
import { getCities, getCountries } from "./countriesAndCitiesAPI.js";
import { clearCitiesList, citySearchInput } from "./autoCompleteCitiesList.js";
// Import an entire module for side effects only, without importing anything.
// This runs the module's global code, but doesn't actually import any values.
// Example: If we run autoCompleteCitiesList() here it won't work because its not defined
import "./autoCompleteCitiesList.js";




//! Temp. data to get dynamically
const choosenZone = {
    city: "Meknes",
    country: "france",
    latitude: "33.9715904",
    longitude: "-6.8498129"
}

const date = new Date()
const toDay = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
}

//* Assign Year in the Footer Dinamically
document.querySelector(".actual-year").textContent = toDay.year

//*  Get prayer times By auto locate the user's position coordinates

const getPrayerTimesByLocationCoordinates = async () => {
    try {
        let coordinates = await getUserLocationCoordinates()
        //! Ligne to remove
        document.querySelector(".temp-coords").innerText = `Lat: ${coordinates.latitude} / Long: ${coordinates.longitude}`
        //? Result to manipulate & use
        console.log(await prayerTimesByLocationCoordinates(coordinates.latitude, coordinates.longitude, date))
    } catch (err) {
        errorHandler(err)
    }
}

//* Get the ocal adresse by "Reverse Geocoding" (from user's position coordinates)

let zoneInfos = {}
const autoLocatedCity = async () => {
    try {
        const coordinates = await getUserLocationCoordinates()
        const zoneResult = await getAdresse(coordinates.latitude, coordinates.longitude)
        console.log(zoneResult)//! remove
        zoneInfos.cityLongName = zoneResult[zoneResult.length - 4].long_name
        zoneInfos.countryLongName = zoneResult[zoneResult.length - 1].long_name
        zoneInfos.countryShortName = zoneResult[zoneResult.length - 1].short_name
        return zoneInfos

    } catch (err) {
        errorHandler(err)
    }
}

//* Display auto Located City
const actualLocationHolder = document.querySelector(".location__actual-location-wrapper__cityName")
const autoLocateButton = document.querySelector(".auto-locate-button")

window.onload = () => {
    autoLocate()
}

autoLocateButton.onclick = () => {
    autoLocate()
}

const autoLocate = async () => {
    let localZone = await autoLocatedCity()
    if (!localZone) return
    const cityCountryName = `${localZone.cityLongName}, ${localZone.countryShortName}`
    actualLocationHolder.innerText = cityCountryName
    getPrayerTimesByCity(localZone, toDay)
}

//* Get prayer times By specifying a city

const getPrayerTimesByCity = async (zone, date) => {
    try {
        console.log(await prayerTimesByCity(zone, date.month, date.year))
        const prayerTimingResponse = await prayerTimesByCity(zone, date.month, date.year)

        const fajrTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.fajr")
        fajrTimeLabel.innerText = prayerTimingResponse[date.day - 1].timings.Fajr.slice(0, 5)
        const sunriseTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.sunrise")
        sunriseTimeLabel.innerText = prayerTimingResponse[date.day - 1].timings.Sunrise.slice(0, 5)
        const dhuhrTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.dhuhr")
        dhuhrTimeLabel.innerText = prayerTimingResponse[date.day - 1].timings.Dhuhr.slice(0, 5)
        const asrTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.asr")
        asrTimeLabel.innerText = prayerTimingResponse[date.day - 1].timings.Asr.slice(0, 5)
        const maghribTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.maghrib")
        maghribTimeLabel.innerText = prayerTimingResponse[date.day - 1].timings.Maghrib.slice(0, 5)
        const ishaaTimeLabel = document.querySelector(".prayerTimeCard__prayerTime.ishaa")
        ishaaTimeLabel.innerText = prayerTimingResponse[date.day - 1].timings.Isha.slice(0, 5)
    } catch (err) {
        errorHandler(err)
    }
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
            actualLocationHolder.innerText = 'Undetected Location'
            break;
        case 2:
            errorMessage = "Location unavailable."
            actualLocationHolder.innerText = 'Location unavailable'
            break;
        case 3:
            errorMessage = "Request timeout."
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



// const myDate = new Date();
// console.log(myDate)
// console.log(myDate.toLocaleDateString())
// console.log(myDate.toJSON())
// console.log(myDate.toJSON().slice(0, 10))
// console.log(myDate.getDay()) // 2 = Tuesday
// console.log(myDate.getDate()) // 7 = day number
// console.log(myDate.getMonth()) // 2 = month number (0 = Jan, 1= Feb)
// console.log(myDate.getFullYear()) // 2023
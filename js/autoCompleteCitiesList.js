//? Imported Modules
//==================

import { citiesOfTheWorld } from "./citiesList.js";
import { prayerTimesByCity, renderPrayerTiming, savePrayerTiming } from "./prayerTimesAPI.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import errorHandler from "./errorHandler.js";
import { clearChildren } from "./reuse.js";
import dom from "./domElements.js";


//? Functions
//===========

export function autoCompleteCitiesList() {
    clearChildren(dom.citiesListMatch)
    const userEntry = dom.citySearchInput.value.trim()
    if (userEntry.length < 2) return // Auto-Complete function began after the user enter 2 characters or more
    // citiesListMatch.classList.add("list-of-cities-activated")
    for (let i = 0; i < citiesOfTheWorld.length; i++) {
        let arrayTextMatch = citiesOfTheWorld[i].slice(0, userEntry.length).toLowerCase()
        if (arrayTextMatch === userEntry.toLowerCase()) {
            const cityCountryName = document.createElement("LI")
            cityCountryName.classList.add("extracted-cities-list__city")
            cityCountryName.innerText = citiesOfTheWorld[i]
            dom.citiesListMatch.appendChild(cityCountryName)
            addClickEventToSuggestedCity(cityCountryName, citiesOfTheWorld[i])
        }
    }
}

const addClickEventToSuggestedCity = (liElement, city) => {
    liElement.addEventListener("click", () => {
        // dom.actualLocationLabel.innerText = city // didn't work
        document.querySelector(".location__actual-location-wrapper__cityName").innerText = city
        hideLocationSearchWrapper()
        renderPrayerTimingForChosenCity(city)
    })
}

export const hideLocationSearchWrapper = () => {
    dom.locationSearchWrapper.classList.remove("city-search-component-activated")
    dom.citySearchInput.value = ''
    clearChildren(dom.citiesListMatch)
    const errorLAbel = document.querySelector(".error-label")
    errorLAbel ? errorLAbel.remove() : null // Hide error message if it exist
}

// const clearCitiesList = () => {
//     while (dom.citiesListMatch.firstChild) {
//         dom.citiesListMatch.firstChild.remove()
//     }
// }

async function renderPrayerTimingForChosenCity(chosenCity) {
    try {
        const city = chosenCity.slice(0, -4)
        const country = chosenCity.slice(-2)
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const prayerTimesByCityResponse = await prayerTimesByCity(city, country, day, month, year)
        const fetchedPrayerTimesByCity = savePrayerTiming(prayerTimesByCityResponse)
        renderPrayerTiming(fetchedPrayerTimesByCity)
        renderUpcomingPrayerCard(fetchedPrayerTimesByCity)
    } catch (err) {
        errorHandler(err)
    }
}
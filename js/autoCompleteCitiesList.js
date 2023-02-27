// The entire code is imported to index.js

import { citiesOfTheWorld } from "./citiesList.js";
import { prayerTimesByCity, renderPrayerTiming, savePrayerTiming } from "./prayerTimesAPI.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import { errorHandler } from "./errorHandler.js";

import * as dom from "./domElements.js";


export function autoCompleteCitiesList() {

    clearCitiesList()
    const userEntry = dom.citySearchInput.value.trim()
    if (userEntry.length < 2) return // Auto-Complete function began after the user enter 2 characters or more
    // citiesListMatch.classList.add("list-of-cities-activated")
    for (let i = 0; i < citiesOfTheWorld.length; i++) {
        let arrayTextMatch = citiesOfTheWorld[i].slice(0, userEntry.length).toLowerCase()
        if (arrayTextMatch === userEntry.toLowerCase()) {
            const cityCountryName = document.createElement("LI")
            cityCountryName.classList.add("extracted-cities-list__city")
            cityCountryName.textContent = citiesOfTheWorld[i]
            dom.citiesListMatch.appendChild(cityCountryName)
            addClickEventToSuggestedCity(cityCountryName, citiesOfTheWorld[i])
        }
    }

}

const addClickEventToSuggestedCity = (element, content) => {
    element.addEventListener("mousedown", function () {
        // const chosenCity = this.textContent // this won't refer to th clicked "li" if we use arrow function syntax
        dom.actualLocationLabel.textContent = content
        hideLocationSearchWrapper()
        renderPrayerTimingForChosenCity(content)
    })
}

export const hideLocationSearchWrapper = () => {
    dom.locationSearchWrapper.classList.remove("city-search-component-activated")
    dom.citySearchInput.value = ''
    clearCitiesList()
}

export const clearCitiesList = () => {
    while (dom.citiesListMatch.firstChild) {
        dom.citiesListMatch.firstChild.remove()
    }
}

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
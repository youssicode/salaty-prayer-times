// The entire code is imported to index.js

import { citiesOfTheWorld } from "./citiesList.js";
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
            addClickEventToSuggestedCity(cityCountryName)
        }
    }

}

export const clearCitiesList = () => {
    while (dom.citiesListMatch.firstChild) {
        dom.citiesListMatch.firstChild.remove()
    }
}
const addClickEventToSuggestedCity = (entry) => {
    entry.addEventListener("mousedown", function () {
        dom.citySearchInput.value = this.textContent
        clearCitiesList()
    })
}
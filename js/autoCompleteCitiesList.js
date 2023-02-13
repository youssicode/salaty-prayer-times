// The entire code is imported to index.js

import { citiesOfTheWorld } from "./citiesList.js";

export const citySearchInput = document.querySelector(".search-for-city-input")
const citiesListMatch = document.querySelector(".extracted-cities-list")

const autoCompleteCitiesList = () => {

    citySearchInput.addEventListener("input", function () {
        console.clear() //! To Remove
        clearCitiesList()
        const userEntry = this.value.trim()
        if (userEntry.length < 2) return // Auto-Complete function began after the user enter 2 characters or more
        // citiesListMatch.classList.add("list-of-cities-activated")
        for (let i = 0; i < citiesOfTheWorld.length; i++) {
            let arrayTextMatch = citiesOfTheWorld[i].slice(0, userEntry.length).toLowerCase()
            if (arrayTextMatch === userEntry.toLowerCase()) {
                const cityCountryName = document.createElement("LI")
                cityCountryName.classList.add("extracted-cities-list__city")
                cityCountryName.textContent = citiesOfTheWorld[i]
                citiesListMatch.appendChild(cityCountryName)
                // console.log(citiesOfTheWorld[i]) //! To Remove
            }
        }

    })
}

export const clearCitiesList = () => {
    while (citiesListMatch.firstChild) {
        citiesListMatch.firstChild.remove()
    }
    // OR
    // let listEntries = citiesListMatch.querySelectorAll("li.extracted-cities-list__city")
    // listEntries.forEach(el => citiesListMatch.removeChild(el))

}
autoCompleteCitiesList()

    // < ul class="extracted-cities-list" >
    //     <li class="extracted-cities-list__city">
    //         Valenca, Brazil
    //     </li>
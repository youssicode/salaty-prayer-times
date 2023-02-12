// The entire code is imported to index.js

import { citiesOfTheWorld } from "./citiesList.js";

const autoCompleteCitiesList = () => {
    const citySearchInput = document.querySelector(".search-for-city-input")
    const citiesListMatch = document.querySelector(".cities-list-match")

    citySearchInput.addEventListener("input", function (ev) {
        console.clear() //! To Remove
        const userEntry = this.value.trim()
        if (userEntry.length < 2) return
        for (let i = 0; i < citiesOfTheWorld.length; i++) {
            let arrayTextMatch = citiesOfTheWorld[i].slice(0, userEntry.length).toLowerCase()
            if (arrayTextMatch === userEntry.toLowerCase()) {
                console.log(citiesOfTheWorld[i])
            }
        }

    })
}

autoCompleteCitiesList()


// const citySearchInput = document.querySelector(".search-for-city-input")
// const citiesListMatch = document.querySelector(".cities-list-match")

// citySearchInput.addEventListener("input", function (ev) {
//     const userEntry = this.value
// })
// const autoCompleteCitiesList = (e, val) => {
//     autoCompleteCitiesList(ev, userEntry)
//     console.log(val)
// }

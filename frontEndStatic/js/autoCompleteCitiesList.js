//? Imported Modules
//==================
import { citiesOfTheWorld } from "./citiesList.js"
import { clearChildren } from "./dataRendering.js"
import { addClickEventToSuggestedCity } from "./index.js"
import { query } from "./domElements.js"

//? Functions
//===========

const citiesListMatch = query(".extracted-cities-list")
let newCitiesResult = []
export function autoCompleteCitiesList() {
  const userEntry = query(".search-for-city-input").value.trim()
  const citiesSearchResult = []

  clearChildren(citiesListMatch)
  // Auto-Complete function will run only after typing 2 characters or more
  if (userEntry.length < 2) {
    // Initialize the newCitiesResult array when there is new search
    newCitiesResult.length = 0
    return
  }

  if (newCitiesResult.length === 0) newCitiesResult = citiesOfTheWorld

  newCitiesResult.forEach((city) => {
    const arrayTextMatch = city.slice(0, userEntry.length).toLowerCase()
    if (arrayTextMatch === userEntry.toLowerCase()) {
      renderMatchedCityName(city)
      citiesSearchResult.push(city)
    }
  })
  newCitiesResult = citiesSearchResult
}

const renderMatchedCityName = (city) => {
  const cityCountryName = document.createElement("LI")
  cityCountryName.classList.add("extracted-cities-list__city")
  cityCountryName.textContent = city
  citiesListMatch.appendChild(cityCountryName)
  addClickEventToSuggestedCity(cityCountryName, city)
}

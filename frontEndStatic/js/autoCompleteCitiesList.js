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
  const runningConditionOk = (userEntry) => {
    if (userEntry.length < 2) {
      newCitiesResult.length = 0
      return false
    }
    return true
  }
  const serarchMatchedCities = (cities) => {
    cities.forEach((city) => {
      const renderMatchedCityName = (city) => {
        const cityCountryName = document.createElement("LI")
        cityCountryName.classList.add("extracted-cities-list__city")
        cityCountryName.textContent = city
        citiesListMatch.appendChild(cityCountryName)
        addClickEventToSuggestedCity(cityCountryName, city)
      }
      const arrayTextMatch = city.slice(0, userEntry.length).toLowerCase()
      if (arrayTextMatch === userEntry.toLowerCase()) {
        renderMatchedCityName(city)
        citiesSearchResult.push(city)
      }
    })
    return citiesSearchResult
  }

  clearChildren(citiesListMatch)
  if (!runningConditionOk(userEntry)) return
  if (newCitiesResult.length === 0) newCitiesResult = citiesOfTheWorld
  newCitiesResult = serarchMatchedCities(newCitiesResult)
}

//? Imported Modules
//==================
import { citiesOfTheWorld } from "./citiesList.js"
import { clearChildren, renderMatchedCityName } from "./dataRendering.js"
import { query } from "./domElements.js"

const citiesListMatch = query(".extracted-cities-list")

//? Functions
//===========

export function autoCompleteCitiesList() {
  clearChildren(citiesListMatch)
  const userEntry = query(".search-for-city-input").value.trim()
  // Auto-Complete function will run only after typing 2 characters or more
  if (userEntry.length < 2) return
  searchMatchedCities(userEntry)
}

export const searchMatchedCities = (input) => {
  citiesOfTheWorld.forEach((city) => {
    const arrayTextMatch = city.slice(0, input.length).toLowerCase()
    if (arrayTextMatch === input.toLowerCase()) {
      renderMatchedCityName(city, citiesListMatch)
    }
  })
}

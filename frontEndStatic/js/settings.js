//? Imported Modules
//==================
import { query } from "./domElements.js"
import { saveToLocalStorage, getDataFromLocalStorage } from "./localStorage.js"

//? DOM Elements
//==============
const saveLocationSwitch = query(".switch__input--location")
const dropDownMenu = query(".dropdown__content")

//? Functions
//===========

export function toggleMenu() {
  dropDownMenu.classList.toggle("visible")
}

export const loadSavedLocationSettings = function () {
  const savedLocationInfos = getDataFromLocalStorage("savedLocationInfos")
  if (!savedLocationInfos) return false
  saveLocationSwitch.checked = true
  return savedLocationInfos
}

export const SaveCurrentLocation = function () {
  let currentLocationToSave = ""
  if (saveLocationSwitch.checked) {
    const localStorageSaves = localStorage.getItem("salaty_prayer_times_infos")
    const data = localStorageSaves ? JSON.parse(localStorageSaves) : null
    const {
      locationCoordinates,
      salaty_localAdresse: { cityName, countryShortName },
      salaty_localTimeZone,
    } = data
    currentLocationToSave = {
      locationCoordinates,
      cityName,
      countryShortName,
      salaty_localTimeZone,
    }
  }
  saveToLocalStorage("savedLocationInfos", currentLocationToSave)
}


//? Imported Modules
//==================
import dom from "./domElements.js";
import { saveToLocalStorage, getDataFromLocalStorage} from "./localStorage.js";


//? Functions
//================

export function toggleMenu() {
    dom().dropDownMenu.classList.toggle("visible")
}

export const loadSavedLocationSettings = function () {
    const savedLocationInfos = getDataFromLocalStorage("savedLocationInfos")
    if (!savedLocationInfos) return false
    dom().saveLocationSwitch.checked = true
    return savedLocationInfos
}

export const SaveCurrentLocation = function () {
    let currentLocationToSave  = ''
    if (dom().saveLocationSwitch.checked) {
        const localStorageSaves = localStorage.getItem('salaty_prayer_times_infos')
        const data = localStorageSaves ? JSON.parse(localStorageSaves) : null
        const {locationCoordinates, salaty_localAdresse : {cityName, countryShortName}, salaty_localTimeZone} = data
        currentLocationToSave = {locationCoordinates,cityName, countryShortName,salaty_localTimeZone}
    } 
    saveToLocalStorage ("savedLocationInfos", currentLocationToSave)
}
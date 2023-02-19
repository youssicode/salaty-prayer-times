//? Imported Modules
//==================

import { displayIslamicDate, displayGregorianDate, displayTime } from "./displayCalendars.js";
import { getUserCoordinates, getAdresse, displayLocatedAdresse } from "./autoLocation.js";
// import { errorHandler } from "./errorHandler.js";
import { prayerTimesByLocationCoordinates, displayPrayerTiming } from "./prayerTimesAPI.js";
import { autoCompleteCitiesList, hideLocationSearchWrapper } from "./autoCompleteCitiesList.js";
import * as dom from "./domElements.js";


//? Constantes & Variables
//========================

const date = new Date()
const toDay = {
    day: date.getDate(),
    weekday: date.toLocaleString("default", { weekday: "long" }),
    month: date.getMonth() + 1,
    monthName: date.toLocaleString("default", { month: "short" }),
    year: date.getFullYear(),
}


//? Main Functions
//================

//* Get and display Islamic & Gregorian Dates
displayIslamicDate(toDay)
displayGregorianDate(toDay)

//* Display time
setInterval(() => {
    const time = new Date()
    const timeNow = time.toLocaleTimeString()
    // timeNow: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", second: "numeric", hour12: true })
    displayTime(timeNow)
}, 1000)

//* Get User Location Coordinates and then display the local adresse/city
async function loadData() {
    const coordinates = await getUserCoordinates()
    autoLocateCity(coordinates)
    displayPrayerTimes(coordinates)
}
async function autoLocateCity(coords) {
    const localAdresse = await getAdresse(coords.latitude, coords.longitude);
    displayLocatedAdresse(localAdresse)
}

//* and prayer times specific for that city
async function displayPrayerTimes(coords) {
    const prayerTiming = await prayerTimesByLocationCoordinates(coords.latitude, coords.longitude, toDay);
    displayPrayerTiming(prayerTiming, toDay)
}
loadData()

//* Display city search component

dom.locationBtn.onclick = () => {
    dom.locationSearchWrapper.classList.add("city-search-component-activated")
}

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        hideLocationSearchWrapper()
    }
})
window.addEventListener("click", e => {
    // if the element we clicked on = (e.target) is child of "locationBtn" then return, if not, then execute hideLocationSearchWrapper()
    if (dom.locationBtn.contains(e.target)) return
    hideLocationSearchWrapper()
})


dom.citySearchInput.addEventListener("input", autoCompleteCitiesList)
dom.autoLocateButton.onclick = loadData()




//* Assign Year in the Footer Dinamically
document.querySelector(".actual-year").textContent = toDay.year

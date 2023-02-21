//? Imported Modules
//==================

import { displayIslamicDate, displayGregorianDate, displayTime } from "./displayCalendars.js";
import { getUserCoordinates, getAdresse, displayLocatedAdresse } from "./autoLocation.js";
// import { errorHandler } from "./errorHandler.js";
import { prayerTimesByLocationCoordinates, renderPrayerTiming } from "./prayerTimesAPI.js";
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

//* Display time
setInterval(() => {
    const time = new Date()
    const timeNow = time.toLocaleTimeString("fr")
    // timeNow: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", second: "numeric", hour12: true })
    displayTime(timeNow)
}, 1000)

//* Get and display Islamic & Gregorian Dates
displayIslamicDate(toDay)
displayGregorianDate(toDay)

//* Get User Location Coordinates and then display the local adresse/city
async function loadData() {
    const coordinates = await getUserCoordinates()
    autoLocateCity(coordinates)
    getPrayerTimes(coordinates)
}
async function autoLocateCity(coords) {
    const localAdresse = await getAdresse(coords.latitude, coords.longitude);
    displayLocatedAdresse(localAdresse)
}

//* and prayer times specific for that city
let savedPrayerTimes = []
async function getPrayerTimes(coords) {
    const prayerTiming = await prayerTimesByLocationCoordinates(coords.latitude, coords.longitude);
    savedPrayerTimes = [
        { prayerName: 'Fajr', prayerTime: prayerTiming.timings.Fajr.slice(0, 5) },
        { prayerName: 'Sunrise', prayerTime: prayerTiming.timings.Sunrise.slice(0, 5) },
        { prayerName: 'Dhuhr', prayerTime: prayerTiming.timings.Dhuhr.slice(0, 5) },
        { prayerName: 'Asr', prayerTime: prayerTiming.timings.Asr.slice(0, 5) },
        { prayerName: 'Maghrib', prayerTime: prayerTiming.timings.Maghrib.slice(0, 5) },
        { prayerName: 'Ishaa', prayerTime: prayerTiming.timings.Isha.slice(0, 5) }
    ]
    console.log("I m here", savedPrayerTimes)
    renderPrayerTiming(savedPrayerTimes, toDay)
    renderUpcomingPrayerCard(savedPrayerTimes)
}
function renderUpcomingPrayerCard(savedPrayerTimes) {
    const time = new Date()
    const actualTimeStamp = time.getTime()
    // const timeNow = time.toLocaleTimeString("fr") //* Time format here mater to get the expected result.
    for (let i = 0; i < savedPrayerTimes.length; i++) {
        const upComingPrayerTimeStamp = (new Date(`${time.toDateString()} ${savedPrayerTimes[i].prayerTime}`)).getTime()
        // console.log("fetched time", (new Date(`${date.toDateString()} ${savedPrayerTimes[i].prayerTime}`)).getTime())//! remove
        // console.log("time now", time.getTime()) //! remove
        if (upComingPrayerTimeStamp > actualTimeStamp) {
            dom.upcomingPrayerLabel.innerText = savedPrayerTimes[i].prayerName
            let countDownValue = (upComingPrayerTimeStamp - actualTimeStamp) / (1000 * 60)
            console.log("Count Down Value", countDownValue)//! remove
            dom.remainingTimeLabel.innerText = countDownValue

            break
        }
    }
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

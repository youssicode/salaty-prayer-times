//? Imported Modules
//==================

import { getIslamicDate } from "./displayCalendars.js";
import { getUserCoordinates, autoLocateCity } from "./autoLocation.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import errorHandler from "./errorHandler.js"; // default function
import { prayerTimesByLocationCoordinates, extractMainPrayerTimes } from "./prayerTimesAPI.js";
import { autoCompleteCitiesList } from "./autoCompleteCitiesList.js";
import getNearbyMosquesList from "./nearbyMosques.js"; // default function
import saveToLocalStorage, { getDataFromLocalStorage } from "./saveToLocalStorage.js";
import { renderLocalTime, renderGregorianDate, renderPrayerTiming, renderFooterYear, hideLocationSearchWrapper, hideErrorMessage, hideNearbyMosques } from "./dataRendering.js";
import dom from "./domElements.js"; // default object


//! Global Constantes & Variables
//===============================

// const toDay = {
//     day: date.getDate(),
//     weekday: date.toLocaleString("default", { weekday: "long" }),
//     month: date.getMonth() + 1,
//     monthName: date.toLocaleString("default", { month: "short" }),
//     year: date.getFullYear(),
// }

//? Main Functions
//================
//* Get and display Islamic & Gregorian Dates
const date = new Date()
getIslamicDate(date)
renderGregorianDate(date)

//! setInterval(() => {
//!    const time = new Date().toLocaleTimeString("fr") // With Seconds
//!   //* const time = new Date().toLocaleTimeString("fr", { hour: "2-digit", minute: "2-digit" }) // Without Seconds
//!  renderLocalTime(time)
//! }, 1000)
//* Display local time
let timeLoop
export const displayTime = (timezone) => {
    clearInterval(timeLoop)
    //! if (timeLoop) clearInterval(timeLoop)
    timeLoop = setInterval(() => {
        const date = new Date();
        const options = {
            timeZone: timezone,
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
            //! second: 'numeric'
        };
        const time = date.toLocaleString('en-US', options);

        //! const time = new Date().toLocaleTimeString("fr") // With Seconds
        renderLocalTime(time)
    }, 1000)
}

//* Get User Location Coordinates and then display the local time, adresse/city and prayer times
async function loadData(time_zone) {
    displayTime(time_zone)
    const locationCoordinates = await getUserCoordinates()
    if (locationCoordinates) {
        saveToLocalStorage('locationCoordinates', locationCoordinates)
        autoLocateCity(locationCoordinates)
        getPrayerTimes(locationCoordinates)
    }
}
const time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
window.onload = loadData(time_zone)

async function getPrayerTimes(coords) {
    try {
        //! const prayerTimingApiResponse = await prayerTimesByLocationCoordinates(coords.latitude, coords.longitude);
        //! const fetchedPrayerTimes = extractMainPrayerTimes(prayerTimingApiResponse)
        const { timings } = await prayerTimesByLocationCoordinates(coords.latitude, coords.longitude);
        const fetchedPrayerTimes = extractMainPrayerTimes(timings)
        saveToLocalStorage('prayerTimings', fetchedPrayerTimes)
        renderPrayerTiming(fetchedPrayerTimes)
        renderUpcomingPrayerCard(fetchedPrayerTimes)
    } catch (err) {
        errorHandler(err)
    }
}

//* Display/Hide city search component
dom().locationBtn.addEventListener("mousedown", () => {
    dom().locationSearchWrapper.classList.add("city-search-component-activated")
    //* Auto-complete user entry with matched cities in Search component
    dom().citySearchInput.addEventListener("input", autoCompleteCitiesList)
    //* Manualy tirgger Auto-Location & Rendering Prayer Times functions
    dom().autoLocateButton.addEventListener("click", () => {
        hideErrorMessage()
        loadData()
        hideLocationSearchWrapper()
        hideNearbyMosques()
    })
})

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        hideLocationSearchWrapper()
    }
})
window.addEventListener("click", e => {
    // if the search component is hidden or the element we clicked on = (e.target) is child of "locationBtn" then return, if not, then execute hideLocationSearchWrapper()
    if (!dom().locationSearchWrapper.classList.contains("city-search-component-activated") || dom().locationWrapper.contains(e.target)) return
    hideLocationSearchWrapper()
})

//* Activate / Di-activate Call-To-Prayer feature
dom().adhanBells.forEach(el => {
    el.addEventListener("click", function () {
        this.classList.toggle("prayerTimeCard__adhan--disabled")
    })
});

//* Render Nearby Mosques List according to current location
dom().nearbyMosquesShowBtn.addEventListener("click", () => {
    if (dom().nearbyMosquesSection.classList.contains("nearbyMosquesBtnClicked")) return
    const coords = getDataFromLocalStorage("locationCoordinates")
    getNearbyMosquesList(coords)
})

//* Assign Year in the Footer Dinamically
renderFooterYear(date.getFullYear())
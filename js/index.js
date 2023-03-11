//? Imported Modules
//==================

import { displayIslamicDate, displayGregorianDate } from "./displayCalendars.js";
import { getUserCoordinates, autoLocateCity } from "./autoLocation.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import { errorHandler } from "./errorHandler.js";
import { prayerTimesByLocationCoordinates, renderPrayerTiming, savePrayerTiming } from "./prayerTimesAPI.js";
import { autoCompleteCitiesList, hideLocationSearchWrapper } from "./autoCompleteCitiesList.js";
import { getNearbyMosques } from "./nearbyMosques.js";
import dom from "./domElements.js";

//!
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '919f482060msh52877e8996de734p164da0jsnd987d3386bcb',
//         'X-RapidAPI-Host': 'nearby-places.p.rapidapi.com'
//     }
// };

// fetch('https://nearby-places.p.rapidapi.com/nearby?lat=34.2591485&lng=-5.9221253&type=cafe&radius=200', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
//!



getNearbyMosques()


//!
//? Global Constantes & Variables
//===============================

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

//* Display actual time
setInterval(() => {
    const time = new Date().toLocaleTimeString("fr") // With Seconds
    // const time = new Date().toLocaleTimeString("fr", { hour: "2-digit", minute: "2-digit" }) // Without Seconds
    dom.mainTimeLabel.innerText = time
}, 1000)

//* Get and display Islamic & Gregorian Dates
displayIslamicDate(toDay)
displayGregorianDate(toDay)

//* Get User Location Coordinates and then display the local adresse/city...
async function renderFetchedData() {
    const coordinates = await getUserCoordinates()
    if (coordinates) {
        autoLocateCity(coordinates)
        getPrayerTimes(coordinates)
    }
}

//* ...and prayer times specific for that city
async function getPrayerTimes(coords) {
    try {
        const prayerTimingApiResponse = await prayerTimesByLocationCoordinates(coords.latitude, coords.longitude);
        const fetchedPrayerTimes = savePrayerTiming(prayerTimingApiResponse)
        renderPrayerTiming(fetchedPrayerTimes)
        renderUpcomingPrayerCard(fetchedPrayerTimes)
    } catch (err) {
        errorHandler(err)
    }
}

renderFetchedData()

//* Display/Hide city search component

dom.locationBtn.addEventListener("click", () => {
    dom.locationSearchWrapper.classList.add("city-search-component-activated")
})

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

//* Auto-complete user entry with matched cities in Search component
dom.citySearchInput.addEventListener("input", autoCompleteCitiesList)

//* Manualy tirgger Auto-Location & Rendering Prayer Times functions
dom.autoLocateButton.addEventListener("click", renderFetchedData)

//* Activate / Di-activate Call-To-Prayer feature
dom.adhanBells.forEach(el => {
    el.addEventListener("click", function () {
        this.classList.toggle("prayerTimeCard__adhan--disabled")
    })
});

//* Assign Year in the Footer Dinamically
document.querySelector(".actual-year").textContent = toDay.year

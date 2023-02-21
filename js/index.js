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

//* Get User Location Coordinates and then display the local adresse/city...
async function loadData() {
    const coordinates = await getUserCoordinates()
    autoLocateCity(coordinates)
    getPrayerTimes(coordinates)
}
async function autoLocateCity(coords) {
    const localAdresse = await getAdresse(coords.latitude, coords.longitude);
    displayLocatedAdresse(localAdresse)
}

//* ...and prayer times specific for that city
let fetchedPrayerTimes = []
async function getPrayerTimes(coords) {
    const prayerTiming = await prayerTimesByLocationCoordinates(coords.latitude, coords.longitude);
    fetchedPrayerTimes = [
        { prayerName: 'Fajr', prayerTime: prayerTiming.timings.Fajr.slice(0, 5) },
        { prayerName: 'Sunrise', prayerTime: prayerTiming.timings.Sunrise.slice(0, 5) },
        { prayerName: 'Dhuhr', prayerTime: prayerTiming.timings.Dhuhr.slice(0, 5) },
        { prayerName: 'Asr', prayerTime: prayerTiming.timings.Asr.slice(0, 5) },
        { prayerName: 'Maghrib', prayerTime: prayerTiming.timings.Maghrib.slice(0, 5) },
        { prayerName: 'Ishaa', prayerTime: prayerTiming.timings.Isha.slice(0, 5) }
    ]
    renderPrayerTiming(fetchedPrayerTimes, toDay)
    renderUpcomingPrayerCard()
}

function renderUpcomingPrayerCard() {
    const date = new Date()
    const actualTimeStamp = date.getTime()
    for (let i = 0; i < fetchedPrayerTimes.length; i++) {
        const upComingPrayerTimeStamp = (new Date(`${date.toDateString()} ${fetchedPrayerTimes[i].prayerTime}`)).getTime()
        if (upComingPrayerTimeStamp > actualTimeStamp) {
            dom.upcomingPrayerLabel.innerText = fetchedPrayerTimes[i].prayerName
            startCountDown(upComingPrayerTimeStamp)
            break
        }
    }
}
const startCountDown = (upComingPrayerTime) => {
    let remainingTimeStamp, hours, minutes, seconds
    let upComingPrayerCountDown = setInterval(() => {
        let timeNow = new Date().getTime()
        remainingTimeStamp = (upComingPrayerTime - timeNow)
        hours = Math.floor(remainingTimeStamp / (1000 * 60 * 60))
        minutes = Math.floor((remainingTimeStamp % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((remainingTimeStamp % (1000 * 60)) / 1000)
        hours = hours < 10 ? '0' + hours : hours,
            minutes = minutes < 10 ? '0' + minutes : minutes,
            seconds = seconds < 10 ? '0' + seconds : seconds,
            dom.remainingTimeLabel.innerText = `${hours}:${minutes}:${seconds}`

        if (remainingTimeStamp <= 0) {
            clearInterval(upComingPrayerCountDown)
            renderUpcomingPrayerCard()
        }
    }, 1000);
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

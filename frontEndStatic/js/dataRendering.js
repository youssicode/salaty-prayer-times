//? Imported Modules
//==================

import { addClickEventToSuggestedCity } from "./index.js"
import { getDataFromLocalStorage } from "./localStorage.js"
import { query, queryAll } from "./domElements.js"

//? DOM Elements
//==============
const actualLocationLabel = query(
  ".location__actual-location-wrapper__cityName"
)
const nearbyMosquesSection = query(".nearbyMosquesSection")
const mosquesWrapper = query(".mosquesWrapper")

//? Functions
//===========
export const renderLocalTime = (time) => {
  query(".timingContainer__timeDua__timeNow").textContent = time
}

export const renderIslamicCalender = (islamicDate) => {
  const { month, day, year } = islamicDate
  const islamic_date_label = `${month} ${day}, ${year}`
  query(".islamic_date").textContent = islamic_date_label
}

export const renderGregorianDate = (date) => {
  const toDay = {
    day: date.getDate(),
    weekday: date.toLocaleString("default", { weekday: "long" }),
    month: date.getMonth() + 1,
    monthName: date.toLocaleString("default", { month: "short" }),
    year: date.getFullYear(),
  }

  query(
    ".gregorian_date"
  ).textContent = `${toDay.weekday}, ${toDay.monthName} ${toDay.day}, ${toDay.year}`
}

export const renderAutoLocatedCity = ({ cityName, countryShortName }) => {
  actualLocationLabel.textContent = `${cityName}, ${countryShortName}`
}

export const renderPrayerTiming = (timesArray) => {
  const prayerTimeLabels = queryAll(".prayerTimeCard__prayerTime")
  for (let i = 0; i < prayerTimeLabels.length; i++) {
    prayerTimeLabels[i].textContent = timesArray[i].prayerTime
  }
}

export const renderUpcomingPrayer = (index, content) => {
  const prayerTimeCards = queryAll(".prayerTimeCard")
  prayerTimeCards.forEach((card) => {
    card.classList.remove("prayerTimeCard--nextPrayer")
  })
  prayerTimeCards[index].classList.add("prayerTimeCard--nextPrayer")
  query(".timingContainer__upcomingPrayer__prayerName").textContent = content
}

export const renderUpcomingPrayerCountDown = (remainingTimeStamp) => {
  let hours = Math.floor(remainingTimeStamp / (1000 * 60 * 60))
  let minutes = Math.floor(
    (remainingTimeStamp % (1000 * 60 * 60)) / (1000 * 60)
  )
  let seconds = Math.floor((remainingTimeStamp % (1000 * 60)) / 1000)
  hours = hours < 10 ? "0" + hours : hours
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds
  query(
    ".timingContainer__upcomingPrayer__remainingTime"
  ).textContent = `${hours}:${minutes}:${seconds}`
}

export const renderCallToPrayerOverlay = () => {
  const adhanOverlay = query(".adhan-overlay")
  const upcomingPrayerCustomBorder = query(".custom-border")

  // play 'Call-To_Prayer' sound track
  let adhanSound = document.createElement("audio")
  adhanSound.setAttribute("src", "../src/audio/Adhan_Alaqsa.mp3")
  adhanSound.play()

  // Show/Hide overlay + Start/Stop Adhan
  adhanOverlay.classList.remove("adhan-overlay--hidden")
  upcomingPrayerCustomBorder.classList.add("animation-paused")
  document.body.classList.add("noscroll") // Prevent the main page from scrolling

  // Hide overlay + Stop Adhan
  query(".mute-adhan-button").addEventListener("click", stopAdhan)
  window.addEventListener("keydown", (e) =>
    e.key == "Escape" ? stopAdhan() : null
  )
  // Stop/Hide Adhan/Overlay when the 'Call-To_Prayer' sound track stops playing
  adhanSound.addEventListener("ended", stopAdhan)

  function stopAdhan() {
    document.body.classList.remove("noscroll")
    upcomingPrayerCustomBorder.classList.remove("animation-paused")
    adhanOverlay.classList.add("adhan-overlay--hidden")
    adhanSound.pause()
  }
}

export const renderMosquesList = (lists) => {
  nearbyMosquesSection.classList.add("nearbyMosquesBtnClicked") //show area that will contain list of mosques and the map
  displayMosquesList(lists)
  //* add EventListener to Remove Nearby Mosques List
  query(".displayNearbyMosques__hide").addEventListener("click", () => {
    hideNearbyMosques()
  })
}

export const hideNearbyMosques = () => {
  mosquesWrapper.innerHTML = ""
  nearbyMosquesSection.classList.remove("nearbyMosquesBtnClicked")
}

const displayMosquesList = (mosques_list) => {
  const domMosquesCardsWrap = document.createElement("ul")
  domMosquesCardsWrap.className = "mosquesList"
  mosquesWrapper.appendChild(domMosquesCardsWrap)

  mosques_list.forEach((mosque) => {
    const mosqueCardTemplate = `
        <li class="mosqueInformationsCard">
        <div class="mosqueInformationsCard__mosque-icon fa-solid fa-mosque"></div>
        <div class="mosqueInformationsCard__title">
        <h4 class="mosqueInformationsCard__title__mosque-name">${
          mosque.name
        }</h4>
        <p class="mosqueInformationsCard__title__city">${actualLocationLabel.textContent.slice(
          0,
          -4
        )}</p>
        </div>
        <div class="mosqueInformationsCard__distanceWrapper">
        <div class="mosqueInformationsCard__distanceWrapper__direction-icon fa-solid fa-diamond-turn-right"></div>
        <p class="mosqueInformationsCard__distanceWrapper__distance">${
          mosque.distance
        } meters</p>
        </div>
        </li>
        `
    domMosquesCardsWrap.insertAdjacentHTML("beforeend", mosqueCardTemplate)
  })

  const mapContainer = document.createElement("aside")
  mapContainer.id = "map"
  mosquesWrapper.appendChild(mapContainer)

  displayMosquesMarkersOnMap(mosques_list, mapContainer)
}

const displayMosquesMarkersOnMap = (mosquesMarkers, mapContainer) => {
  ;(function initMap() {
    // Defining tha map and its params
    const currentLocation = getDataFromLocalStorage("locationCoordinates")
    const map = new google.maps.Map(mapContainer, {
      zoom: getZoomLevel(mapContainer.offsetWidth),
      center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
    })
    // Function to get the zoom level based on screen width (optional)
    function getZoomLevel(width) {
      if (width < 450) {
        return 13
      }
      return 14
    }
    // putting Markers
    mosquesMarkers.forEach((marker) => {
      const image = "../src/images/icons8-mosque-35.png"
      const mosqueMarker = new google.maps.Marker({
        position: marker.coords,
        map,
        icon: image,
      })
    })
  })()
}

export const renderMatchedCityName = (city, city_wrapper) => {
  const cityCountryName = document.createElement("LI")
  cityCountryName.classList.add("extracted-cities-list__city")
  cityCountryName.textContent = city
  city_wrapper.appendChild(cityCountryName)
  addClickEventToSuggestedCity(cityCountryName, city)
}

export const hideLocationSearchWrapper = () => {
  query(".location__search-wrapper").classList.remove(
    "city-search-component-activated"
  )
  query(".search-for-city-input").value = ""
  clearChildren(query(".extracted-cities-list"))
}

export const renderFooterYear = (year) => {
  query(".actual-year").textContent = year
}

export const clearChildren = (target) => {
  target.innerHTML = ""
}

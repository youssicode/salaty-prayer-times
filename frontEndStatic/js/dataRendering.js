//? Imported Modules
//==================

import { addClickEventToSuggestedCity } from "./index.js"
import { getDataFromLocalStorage } from "./localStorage.js"
import dom from "./domElements.js"

//? Functions
//================
export const renderLocalTime = (time) => {
  dom().mainTimeLabel.textContent = time
}

export const renderIslamicCalender = (islamicDate) => {
  const { month, day, year } = islamicDate
  const islamic_date_label = `${month} ${day}, ${year}`
  dom().islamicDateLabel.textContent = islamic_date_label
}

export const renderGregorianDate = (date) => {
  const toDay = {
    day: date.getDate(),
    weekday: date.toLocaleString("default", { weekday: "long" }),
    month: date.getMonth() + 1,
    monthName: date.toLocaleString("default", { month: "short" }),
    year: date.getFullYear(),
  }

  dom().gregorianDateLabel.textContent = `${toDay.weekday}, ${toDay.monthName} ${toDay.day}, ${toDay.year}`
}

export const renderAutoLocatedCity = ({ cityName, countryShortName }) => {
  dom().actualLocationLabel.textContent = `${cityName}, ${countryShortName}`
}

export const renderPrayerTiming = (timesArray) => {
  for (let i = 0; i < dom().prayerTimeLabels.length; i++) {
    dom().prayerTimeLabels[i].textContent = timesArray[i].prayerTime
  }
}

export const renderUpcomingPrayer = (index, content) => {
  dom().prayerTimeCards.forEach((card) => {
    card.classList.remove("prayerTimeCard--nextPrayer")
  })
  dom().prayerTimeCards[index].classList.add("prayerTimeCard--nextPrayer")
  dom().upcomingPrayerLabel.textContent = content
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
  dom().countDownLabel.textContent = `${hours}:${minutes}:${seconds}`
}

export const renderCallToPrayerOverlay = () => {
  // play 'Call-To_Prayer' sound track
  let adhanSound = document.createElement("audio")
  adhanSound.setAttribute("src", "../src/audio/Adhan_Alaqsa.mp3")
  adhanSound.play()
  // Show/Hide overlay + Start/Stop Adhan
  dom().adhanOverlay.classList.remove("adhan-overlay--hidden")
  dom().upcomingPrayerCustomBorder.classList.add("animation-paused")
  document.body.classList.add("noscroll") // Prevent the main page from scrolling
  // Hide overlay + Stop Adhan
  dom().muteAdhanButton.addEventListener("click", stopAdhan)
  window.addEventListener("keydown", (e) =>
    e.key == "Escape" ? stopAdhan() : null
  )
  // Stop/Hide Adhan/Overlay when the 'Call-To_Prayer' sound track stops playing
  adhanSound.addEventListener("ended", stopAdhan)

  function stopAdhan() {
    document.body.classList.remove("noscroll")
    dom().upcomingPrayerCustomBorder.classList.remove("animation-paused")
    dom().adhanOverlay.classList.add("adhan-overlay--hidden")
    adhanSound.pause()
  }
}

export const renderMosquesList = (lists) => {
  dom().nearbyMosquesSection.classList.add("nearbyMosquesBtnClicked") //show area that will contain list of mosques and the map
  displayMosquesList(lists)
  //* add EventListener to Remove Nearby Mosques List
  dom().nearbyMosquesHideBtn.addEventListener("click", () => {
    hideNearbyMosques()
  })
}

export const hideNearbyMosques = () => {
  dom().mosquesWrapper.innerHTML = ""
  dom().nearbyMosquesSection.classList.remove("nearbyMosquesBtnClicked")
}

const displayMosquesList = (mosques_list) => {
  const domMosquesCardsWrap = document.createElement("ul")
  domMosquesCardsWrap.className = "mosquesList"
  dom().mosquesWrapper.appendChild(domMosquesCardsWrap)

  mosques_list.forEach((mosque) => {
    const mosqueCardTemplate = `
        <li class="mosqueInformationsCard">
        <div class="mosqueInformationsCard__mosque-icon fa-solid fa-mosque"></div>
        <div class="mosqueInformationsCard__title">
        <h4 class="mosqueInformationsCard__title__mosque-name">${
          mosque.name
        }</h4>
        <p class="mosqueInformationsCard__title__city">${dom().actualLocationLabel.textContent.slice(
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
  dom().mosquesWrapper.appendChild(mapContainer)

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
  //! dom().citiesListMatch.appendChild(cityCountryName)
  addClickEventToSuggestedCity(cityCountryName, city)
}

export const hideLocationSearchWrapper = () => {
  dom().locationSearchWrapper.classList.remove(
    "city-search-component-activated"
  )
  dom().citySearchInput.value = ""
  clearChildren(dom().citiesListMatch)
}

export const renderFooterYear = (year) => {
  dom().footerYear.textContent = year
}

export const clearChildren = (target) => {
  target.innerHTML = ""
}

//? Imported Modules
//==================

import { getIslamicDate, refreshGregorianDate } from "./calendars.js";
import { getUserCoordinates, autoLocateCity } from "./locations.js";
import { getPrayerTimes, refreshPrayerTimingForChosenCity } from "./prayerTimings.js";
import { autoCompleteCitiesList } from "./autoCompleteCitiesList.js";
import { saveToLocalStorage, getDataFromLocalStorage} from "./localStorage.js";
import { clearChildren, renderLocalTime, renderGregorianDate, renderFooterYear, hideLocationSearchWrapper, hideNearbyMosques, renderAutoLocatedCity, renderIslamicCalender} from "./dataRendering.js";
import { toggleMenu, SaveCurrentLocation, loadSavedLocationSettings } from "./settings.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import { loadAdhanSettings, adhanActivation, initiateAdhanSettings } from "./adhanSettings.js";
import { renderTableData, renderTimesTableModalOverlay,closeTimesTableModal} from "./timesTable.js";
import { renderAboutModalOverlay, closeAboutModal } from "./about.js";
import getNearbyMosquesList from "./nearbyMosques.js";
import { getAndRenderHadeeth } from "./hadeeths_list.js";
import dom from "./domElements.js"; // default export
import errorHandler, {hideErrorMessage} from "./errorHandler.js";

//? Main Functions
//================

// DOMContentLoaded event as it is faster and more efficient than window.onload 
document.addEventListener("DOMContentLoaded", async () => {
  
  const SavedLocationSettings = loadSavedLocationSettings()
  if (!SavedLocationSettings) {
    
    const local_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    saveToLocalStorage("salaty_localTimeZone", local_time_zone)

    //* Get and display (today) Islamic & Gregorian Dates
    const date = new Date()
    getIslamicDate(date)
    renderGregorianDate(date)

    //* Get User Location Coordinates and then display the local time, adresse/city and prayer times
    loadData(local_time_zone)
  
  } else {
    
    const {locationCoordinates, cityName, countryShortName,salaty_localTimeZone} = SavedLocationSettings
    renderAutoLocatedCity({cityName, countryShortName})
    refreshGregorianDate(salaty_localTimeZone)

    //* Display time based on location's timezone
    displayTime(salaty_localTimeZone)

    //* Get & render updated prayer timings & return updated Islamic Date
    const { newHijriDate} = await refreshPrayerTimingForChosenCity(`${cityName}, ${countryShortName}`)
    renderIslamicCalender(newHijriDate)

    //* Refresh Upcoming Card (Updated prayers timing were saved in refreshPrayerTimingForChosenCity() function)
    const fetchedPrayerTimesByCity = getDataFromLocalStorage('prayerTimings')
    renderUpcomingPrayerCard(fetchedPrayerTimesByCity, salaty_localTimeZone)

    // RE-save coordinates to ensure that saved location's coords had not been changer when refreshPrayerTimingForChosenCity() function was executed
    saveToLocalStorage('locationCoordinates', locationCoordinates)
  }
  //* Assign Year in the Footer Dinamically
  renderFooterYear(new Date().getFullYear())
  
  // Load 'Call-To-Prayer/Adhan' saved Settings
  loadAdhanSettings()

  // Fetch and display Hadeeth of the day
  getAndRenderHadeeth()
});


let timeLoop;
export const displayTime = (timezone) => {
  clearInterval(timeLoop);
  timeLoop = setInterval(() => {
    const date = new Date();
    const options = {
      timeZone: timezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };
    const hour = date.getHours();
    const time =
    hour === 0
        ? date.toLocaleTimeString("en-US", options).replace(/24:/, "00:")
        : date.toLocaleTimeString("en-US", options); // X.replace(/24:/, '00:')=>replace '24'(midnight hour format) to '00', the ':' to avoid replacing minutes
    renderLocalTime(time);
  }, 1000);
};

async function loadData(time_zone) {
  displayTime(time_zone);
  const locationCoordinates = await getUserCoordinates();
  if (locationCoordinates) {
    saveToLocalStorage("locationCoordinates", locationCoordinates);
    autoLocateCity(locationCoordinates);
    getPrayerTimes(locationCoordinates);
  }
}

//* Manualy tirgger Auto-Location & Rendering Prayer Times and the other infos
dom().autoLocateButton.addEventListener("click", () => {
  hideErrorMessage()
  hideLocationSearchWrapper()
  hideNearbyMosques()

  const local_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  saveToLocalStorage("salaty_localTimeZone", local_timezone)

  //* Refresh Current Gregorian Date
  refreshGregorianDate(local_timezone)
  //* Refresh Current Hijri Date
  getIslamicDate(new Date())
  //* Refresh Current Time and Prayers Data
  loadData(local_timezone)
});

//* Display/Hide city search component
dom().showLocationSearchWrapper.addEventListener("mousedown", () => {
  dom().locationSearchWrapper.classList.add("city-search-component-activated");
});

// Search Data about typed city
dom().searchForCityBtn.addEventListener("click", () => {
  const userInput = dom().citySearchInput.value
  if (testTypedCityFormat(userInput)) {
    refreshDataForNewCity(userInput)
  } else {
    const err = new Error("Wrong input format.")
    err.code = 66
    errorHandler(err)
  }
});

const testTypedCityFormat = (input) => {
  // regular expression to match the format used to fetch times data
  const regex = /^[a-zA-Z\s\-.']+,\s{1}[a-zA-Z]{2}$/; 
  // ^ the starting
  // [a-zA-Z\s\.\-\']+  one or more letters, spaces, periods, hyphens, or apostrophes (for city name)
  // , then a comma
  // \s{1} then exactly one whitespace character (for separating city and country eso)
  // [a-zA-Z]{2} then exactly two letters (for country eso code)
  // $ the end of the string

  if (input.match(regex)) return true
  return false
}

//* Auto-complete user entry with matched cities in Search component
dom().citySearchInput.addEventListener("input", autoCompleteCitiesList)

export const addClickEventToSuggestedCity = (element, city) => {
  element.addEventListener("click", async () => {
    refreshDataForNewCity(city)
  })
}

const refreshDataForNewCity = async (city) => {
  try {
    dom().actualLocationLabel.innerText = city
    const { newHijriDate, city_time_zone } = await refreshPrayerTimingForChosenCity(city)
    saveToLocalStorage('salaty_localTimeZone', city_time_zone)
    const cityAdresse = {
        cityName: city.slice(0, -4),
        countryName: city.slice(-2),
        countryShortName: city.slice(-2)
    }
    saveToLocalStorage('salaty_localAdresse', cityAdresse)
    hideErrorMessage()
    hideLocationSearchWrapper()
    hideNearbyMosques()
  
    //* Refresh Current Gregorian Date
    refreshGregorianDate(city_time_zone)
  
    //* Refresh Current Hijri Date
    renderIslamicCalender(newHijriDate)
  
    //* Refresh Current Time
    displayTime(city_time_zone)
  
    //* Refresh Upcoming Card
    const fetchedPrayerTimesByCity = getDataFromLocalStorage('prayerTimings')
    renderUpcomingPrayerCard(fetchedPrayerTimesByCity, city_time_zone)
    
  } catch (error) {
    errorHandler(error)
  }
}

//* Render Nearby Mosques List according to current location
dom().nearbyMosquesShowBtn.addEventListener("click", () => {
  if (dom().nearbyMosquesSection.classList.contains("nearbyMosquesBtnClicked"))
  return;
  const coords = getDataFromLocalStorage("locationCoordinates");
  getNearbyMosquesList(coords);
});

// Hide settings menu & Location Search feature by clicking outside
window.addEventListener("click", (e) => {
  // Hide Settings Menu
  if (dom().dropDownMenu.classList.contains("visible") && !dom().navContainer.contains(e.target)) dom().dropDownMenu.classList.remove("visible");
  // if the search component is hidden or the element we clicked on = (e.target) is child of "locationBtn" then return, if not, then execute hideLocationSearchWrapper()
  if ( !dom().locationSearchWrapper.classList.contains("city-search-component-activated") || dom().locationWrapper.contains(e.target)) return;
  hideLocationSearchWrapper();
});

// Hide settings menu, Location Search feature, 'TimesTable' and 'About' modals using keyboard
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dom().dropDownMenu.classList.remove("visible");
    hideLocationSearchWrapper();
    closeTimesTableModal()
    closeAboutModal()
  }
});

// Show/Hide settings Menu
dom().menuBurgerBtn.onclick = toggleMenu
dom().menuHideBtn.onclick = toggleMenu

// Save Current Location
dom().saveLocationBtn.addEventListener("click", e => {
  // if the user clicks outside the switch btn then toggle its cheched state, otherwise it will be toggled automatically.
  if (!dom().saveLocationSwitchWrapper.contains(e.target)) {
    dom().saveLocationSwitch.checked = !dom().saveLocationSwitch.checked // This is = to this:    dom().saveLocationSwitch.checked = dom().saveLocationSwitch.checked? false : true
  }
  SaveCurrentLocation()
})

// Deactivate All Adhan alarms
dom().activateAdhanBtn.addEventListener("click", e => {
  if (!dom().activateAdhanSwitchWrapper.contains(e.target)) {
    dom().activateAdhanSwitch.checked = !dom().activateAdhanSwitch.checked // This is = to this:    dom().saveLocationSwitch.checked = dom().saveLocationSwitch.checked? false : true
  }
  adhanActivation()
})

// Show Prayer Times Table
dom().showTimesTable.onclick = ()=> {
  renderTimesTableModalOverlay()
}
dom().monthPicker.addEventListener("change", () => {
  clearChildren(dom().timesTableTBody)
  const currentMonth = dom().monthPicker.selectedIndex
  renderTableData(currentMonth + 1)
});

// close Times Table modal
dom().closeTimesTable.onclick = ()=> {
  closeTimesTableModal()
}

// Show 'About' modal
dom().showAboutModal.onclick = ()=> {
  renderAboutModalOverlay()
}
// close 'About' modal
dom().closeAboutModal.onclick = ()=> {
  closeAboutModal ()
}

// Restore settings
dom().restoreSettings.onclick = ()=> {
  let restoreAction = confirm("Are You Sure You Want to Restore Default Settings? Please note that performing this action will delete all saved location data as well as your 'Call-To-Prayer' and themes preferences.");

  if (restoreAction) {
    saveToLocalStorage ("savedLocationInfos", '')
    dom().saveLocationSwitch.checked = false

    initiateAdhanSettings()
    closeAboutModal()
    alert('Default settings restored successfully!')
  }
}

// Hadeeth of the day code
dom().showHadeethBtn.onclick = function () {
  this.classList.toggle("visible")
}


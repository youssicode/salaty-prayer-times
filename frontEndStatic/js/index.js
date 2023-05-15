//? Imported Modules
//==================

import { getIslamicDate, refreshGregorianDate } from "./calendars.js";
import { getUserCoordinates, autoLocateCity, SaveCurrentLocation, loadSavedLocationSettings } from "./locations.js";
import { getPrayerTimes, refreshPrayerTimingForChosenCity } from "./prayerTimings.js";
import { autoCompleteCitiesList } from "./autoCompleteCitiesList.js";
import { saveToLocalStorage, getDataFromLocalStorage} from "./localStorage.js";
import { clearChildren, renderLocalTime, renderGregorianDate, renderFooterYear, hideLocationSearchWrapper, hideErrorMessage, hideNearbyMosques, renderAutoLocatedCity, renderIslamicCalender} from "./dataRendering.js";
import { toggleMenu } from "./settings.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import { loadAdhanSettings, adhanActivation } from "./adhanSettings.js";
import { renderTableData, renderTimesTableModalOverlay} from "./timesTable.js";
import { renderAboutModalOverlay } from "./about.js";
import getNearbyMosquesList from "./nearbyMosques.js";
import dom from "./domElements.js"; // default export

//? Main Functions
//================

// DOMContentLoaded event as it is faster and more efficient than window.onload 
/* //! HHHHHHHHHH
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
});
*/ //! HHHHHHHHHH

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
dom().locationBtn.addEventListener("mousedown", () => {
  dom().locationSearchWrapper.classList.add("city-search-component-activated");
});

//* Auto-complete user entry with matched cities in Search component
dom().citySearchInput.addEventListener("input", autoCompleteCitiesList)

//* Render Nearby Mosques List according to current location
dom().nearbyMosquesShowBtn.addEventListener("click", () => {
  if (dom().nearbyMosquesSection.classList.contains("nearbyMosquesBtnClicked"))
  return;
  const coords = getDataFromLocalStorage("locationCoordinates");
  getNearbyMosquesList(coords);
});

// Hide settings menu & Location Search Wrapper
window.addEventListener("click", (e) => {
  // Hide Settings Menu
  if (dom().dropDownMenu.classList.contains("visible") && !dom().navContainer.contains(e.target)) dom().dropDownMenu.classList.remove("visible");
  // if the search component is hidden or the element we clicked on = (e.target) is child of "locationBtn" then return, if not, then execute hideLocationSearchWrapper()
  if ( !dom().locationSearchWrapper.classList.contains("city-search-component-activated") || dom().locationWrapper.contains(e.target)) return;
  hideLocationSearchWrapper();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dom().dropDownMenu.classList.remove("visible");
    hideLocationSearchWrapper();
  }
});

// Show/Hide settings Menu
dom().menuBurgerBtn.onclick = toggleMenu
dom().menuHideBtn.onclick = toggleMenu

// Save Current Location
dom().saveLocationSwitch.addEventListener("change", SaveCurrentLocation)

// Deactivate All Adhan alarms
dom().activateAdhanSwitch.addEventListener("change", adhanActivation);

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
  document.body.classList.remove("noscroll")
  dom().timesTableModal.classList.remove("open")
}

// Show About modal
dom().showAboutModal.onclick = ()=> {
  renderAboutModalOverlay()
}
// close About modal
dom().closeAboutModal.onclick = ()=> {
  document.body.classList.remove("noscroll")
  dom().aboutModal.classList.remove("open")
}

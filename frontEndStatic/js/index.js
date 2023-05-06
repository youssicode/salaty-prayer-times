//? Imported Modules
//==================

import { getIslamicDate, refreshGregorianDate } from "./displayCalendars.js";
import { getUserCoordinates, autoLocateCity, SaveCurrentLocation, loadSavedLocationSettings } from "./autoLocation.js";
import { getPrayerTimes } from "./prayerTimesAPI.js";
import { autoCompleteCitiesList } from "./autoCompleteCitiesList.js";
import { saveToLocalStorage, getDataFromLocalStorage} from "./saveToLocalStorage.js";
import { renderLocalTime, renderGregorianDate, renderFooterYear, hideLocationSearchWrapper, hideErrorMessage, hideNearbyMosques} from "./dataRendering.js";
import { toggleMenu } from "./burgerMenu.js";
import { loadAdhanSettings, adhanActivation } from "./adhanSettings.js";
import getNearbyMosquesList from "./nearbyMosques.js";
import dom from "./domElements.js"; // default export

//? Main Functions
//================
//* Get and display Islamic & Gregorian Dates
const date = new Date();
getIslamicDate(date);
renderGregorianDate(date);

//* Display local time
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

//* Get User Location Coordinates and then display the local time, adresse/city and prayer times
async function loadData(time_zone) {
  displayTime(time_zone);
  const locationCoordinates = await getUserCoordinates();
  if (locationCoordinates) {
    saveToLocalStorage("locationCoordinates", locationCoordinates);
    autoLocateCity(locationCoordinates);
    getPrayerTimes(locationCoordinates);
  }
}
const local_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
saveToLocalStorage("salaty_localTimeZone", local_time_zone)
// DOMContentLoaded event as it is faster and more efficient than window.onload 
document.addEventListener("DOMContentLoaded", () => {
  loadData(local_time_zone)
  loadAdhanSettings()
  loadSavedLocationSettings()
});

// Settings: Deactivate Adhan Alarm
dom().activateAdhanSwitch.addEventListener("change", adhanActivation);

//* Display/Hide city search component
dom().locationBtn.addEventListener("mousedown", () => {
  dom().locationSearchWrapper.classList.add("city-search-component-activated");
  //* Auto-complete user entry with matched cities in Search component
  dom().citySearchInput.addEventListener("input", autoCompleteCitiesList);
  //* Manualy tirgger Auto-Location & Rendering Prayer Times functions
  dom().autoLocateButton.addEventListener("click", () => {
    hideErrorMessage();
    const local_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    saveToLocalStorage("salaty_localTimeZone", local_time_zone);
    //* Refresh Current Gregorian Date
    refreshGregorianDate(local_time_zone);
    //* Refresh Current Hijri Date
    getIslamicDate(new Date());
    //* Refresh Current Time and Prayers Data
    loadData(local_time_zone);
    hideLocationSearchWrapper();
    hideNearbyMosques();
  });
});

window.addEventListener("click", (e) => {
  // Hide Settings Menu
  if (
    dom().dropDownMenu.classList.contains("visible") &&
    !dom().navContainer.contains(e.target)
  )
    dom().dropDownMenu.classList.remove("visible");
  // if the search component is hidden or the element we clicked on = (e.target) is child of "locationBtn" then return, if not, then execute hideLocationSearchWrapper()
  if (
    !dom().locationSearchWrapper.classList.contains(
      "city-search-component-activated"
    ) ||
    dom().locationWrapper.contains(e.target)
  )
    return;
  hideLocationSearchWrapper();
});

//* Render Nearby Mosques List according to current location
dom().nearbyMosquesShowBtn.addEventListener("click", () => {
  if (dom().nearbyMosquesSection.classList.contains("nearbyMosquesBtnClicked"))
    return;
  const coords = getDataFromLocalStorage("locationCoordinates");
  getNearbyMosquesList(coords);
});

//* Assign Year in the Footer Dinamically
renderFooterYear(date.getFullYear());

// Show/Hide DropDown Menu
dom().menuBurgerBtn.onclick = toggleMenu;
dom().menuHideBtn.onclick = toggleMenu;

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideLocationSearchWrapper();
    dom().dropDownMenu.classList.remove("visible");
  }
});


// Settings: Save Current Location
dom().saveLocationSwitch.addEventListener("change", SaveCurrentLocation);
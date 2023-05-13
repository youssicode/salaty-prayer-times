//? Imported Modules
//==================

import { getIslamicDate, refreshGregorianDate } from "./calendars.js";
import { getUserCoordinates, autoLocateCity, SaveCurrentLocation, loadSavedLocationSettings } from "./locations.js";
import { getPrayerTimes, refreshPrayerTimingForChosenCity } from "./prayerTimings.js";
import { autoCompleteCitiesList } from "./autoCompleteCitiesList.js";
import { saveToLocalStorage, getDataFromLocalStorage} from "./localStorage.js";
import { renderLocalTime, renderGregorianDate, renderFooterYear, hideLocationSearchWrapper, hideErrorMessage, hideNearbyMosques, renderAutoLocatedCity, renderIslamicCalender} from "./dataRendering.js";
import { toggleMenu } from "./settings.js";
import { renderUpcomingPrayerCard } from "./upcomingPrayer.js";
import { loadAdhanSettings, adhanActivation } from "./adhanSettings.js";
import getNearbyMosquesList from "./nearbyMosques.js";
import dom from "./domElements.js"; // default export

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




///////////////////////////////////////////////////7
// Show Prayer Times Table

const showTimesTable = document.querySelector(".dropdown__content__link--2")
const timesTableModal = document.querySelector(".times-table-modal")
const closeModal = document.querySelector(".times-table-modal__close-btn")
const monthPicker = document.querySelector(".times-table__header__month-picker")
const timesTableTBody = document.querySelector(".times-table-tbody")

showTimesTable.onclick = ()=> {
  dom().dropDownMenu.classList.remove("visible")
  timesTableModal.classList.add("open")
    
  //* get current month and put its name in the select list + fetch data according to it
  const currentMonthIndex = new Date().getMonth()
  monthPicker.selectedIndex = currentMonthIndex;
  const currentMonth = monthPicker.value
  renderTableData(currentMonth)
  
}
monthPicker.addEventListener("change", () => {
  const currentMonth = monthPicker.value
  renderTableData(currentMonth)}
);

async function renderTableData(month) {
  const data = await fetchTableData(month)
  mapTableData(data)
}
const fetchTableData = async (month) => {
  // const {data} = await axios("/times-table", params: {month})
  const {data} = timesByCoords //!
  return data
}

//////
const timesByCoords = {
  "code": 200,
  "status": "OK",
  "data": [
      {
          "timings": {
              "Fajr": "05:02 (+01)",
              "Sunrise": "06:35 (+01)",
              "Dhuhr": "13:21 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:08 (+01)",
              "Maghrib": "20:08 (+01)",
              "Isha": "21:35 (+01)",
              "Imsak": "04:52 (+01)",
              "Midnight": "01:21 (+01)",
              "Firstthird": "23:37 (+01)",
              "Lastthird": "03:06 (+01)"
          },
          "date": {
              "readable": "01 May 2023",
              "timestamp": "1682928061",
              "gregorian": {
                  "date": "01-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "01",
                  "weekday": {
                      "en": "Monday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "10-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "10",
                  "weekday": {
                      "en": "Al Athnayn",
                      "ar": "الاثنين"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "05:01 (+01)",
              "Sunrise": "06:33 (+01)",
              "Dhuhr": "13:21 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:08 (+01)",
              "Maghrib": "20:08 (+01)",
              "Isha": "21:36 (+01)",
              "Imsak": "04:51 (+01)",
              "Midnight": "01:21 (+01)",
              "Firstthird": "23:37 (+01)",
              "Lastthird": "03:05 (+01)"
          },
          "date": {
              "readable": "02 May 2023",
              "timestamp": "1683014461",
              "gregorian": {
                  "date": "02-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "02",
                  "weekday": {
                      "en": "Tuesday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "11-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "11",
                  "weekday": {
                      "en": "Al Thalaata",
                      "ar": "الثلاثاء"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:59 (+01)",
              "Sunrise": "06:32 (+01)",
              "Dhuhr": "13:21 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:09 (+01)",
              "Maghrib": "20:09 (+01)",
              "Isha": "21:37 (+01)",
              "Imsak": "04:49 (+01)",
              "Midnight": "01:21 (+01)",
              "Firstthird": "23:37 (+01)",
              "Lastthird": "03:05 (+01)"
          },
          "date": {
              "readable": "03 May 2023",
              "timestamp": "1683100861",
              "gregorian": {
                  "date": "03-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "03",
                  "weekday": {
                      "en": "Wednesday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "12-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "12",
                  "weekday": {
                      "en": "Al Arba'a",
                      "ar": "الاربعاء"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:58 (+01)",
              "Sunrise": "06:31 (+01)",
              "Dhuhr": "13:21 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:10 (+01)",
              "Maghrib": "20:10 (+01)",
              "Isha": "21:38 (+01)",
              "Imsak": "04:48 (+01)",
              "Midnight": "01:21 (+01)",
              "Firstthird": "23:37 (+01)",
              "Lastthird": "03:04 (+01)"
          },
          "date": {
              "readable": "04 May 2023",
              "timestamp": "1683187261",
              "gregorian": {
                  "date": "04-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "04",
                  "weekday": {
                      "en": "Thursday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "13-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "13",
                  "weekday": {
                      "en": "Al Khamees",
                      "ar": "الخميس"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:57 (+01)",
              "Sunrise": "06:31 (+01)",
              "Dhuhr": "13:20 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:11 (+01)",
              "Maghrib": "20:11 (+01)",
              "Isha": "21:39 (+01)",
              "Imsak": "04:47 (+01)",
              "Midnight": "01:21 (+01)",
              "Firstthird": "23:37 (+01)",
              "Lastthird": "03:04 (+01)"
          },
          "date": {
              "readable": "05 May 2023",
              "timestamp": "1683273661",
              "gregorian": {
                  "date": "05-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "05",
                  "weekday": {
                      "en": "Friday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "14-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "14",
                  "weekday": {
                      "en": "Al Juma'a",
                      "ar": "الجمعة"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:55 (+01)",
              "Sunrise": "06:30 (+01)",
              "Dhuhr": "13:20 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:12 (+01)",
              "Maghrib": "20:12 (+01)",
              "Isha": "21:40 (+01)",
              "Imsak": "04:45 (+01)",
              "Midnight": "01:21 (+01)",
              "Firstthird": "23:38 (+01)",
              "Lastthird": "03:04 (+01)"
          },
          "date": {
              "readable": "06 May 2023",
              "timestamp": "1683360061",
              "gregorian": {
                  "date": "06-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "06",
                  "weekday": {
                      "en": "Saturday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "15-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "15",
                  "weekday": {
                      "en": "Al Sabt",
                      "ar": "السبت"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:54 (+01)",
              "Sunrise": "06:29 (+01)",
              "Dhuhr": "13:20 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:12 (+01)",
              "Maghrib": "20:12 (+01)",
              "Isha": "21:41 (+01)",
              "Imsak": "04:44 (+01)",
              "Midnight": "01:20 (+01)",
              "Firstthird": "23:38 (+01)",
              "Lastthird": "03:03 (+01)"
          },
          "date": {
              "readable": "07 May 2023",
              "timestamp": "1683446461",
              "gregorian": {
                  "date": "07-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "07",
                  "weekday": {
                      "en": "Sunday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "16-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "16",
                  "weekday": {
                      "en": "Al Ahad",
                      "ar": "الاحد"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:53 (+01)",
              "Sunrise": "06:28 (+01)",
              "Dhuhr": "13:20 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:13 (+01)",
              "Maghrib": "20:13 (+01)",
              "Isha": "21:42 (+01)",
              "Imsak": "04:43 (+01)",
              "Midnight": "01:20 (+01)",
              "Firstthird": "23:38 (+01)",
              "Lastthird": "03:03 (+01)"
          },
          "date": {
              "readable": "08 May 2023",
              "timestamp": "1683532861",
              "gregorian": {
                  "date": "08-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "08",
                  "weekday": {
                      "en": "Monday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "17-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "17",
                  "weekday": {
                      "en": "Al Athnayn",
                      "ar": "الاثنين"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:52 (+01)",
              "Sunrise": "06:27 (+01)",
              "Dhuhr": "13:20 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:14 (+01)",
              "Maghrib": "20:14 (+01)",
              "Isha": "21:43 (+01)",
              "Imsak": "04:42 (+01)",
              "Midnight": "01:20 (+01)",
              "Firstthird": "23:38 (+01)",
              "Lastthird": "03:03 (+01)"
          },
          "date": {
              "readable": "09 May 2023",
              "timestamp": "1683619261",
              "gregorian": {
                  "date": "09-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "09",
                  "weekday": {
                      "en": "Tuesday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "18-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "18",
                  "weekday": {
                      "en": "Al Thalaata",
                      "ar": "الثلاثاء"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      },
      {
          "timings": {
              "Fajr": "04:50 (+01)",
              "Sunrise": "06:26 (+01)",
              "Dhuhr": "13:20 (+01)",
              "Asr": "17:04 (+01)",
              "Sunset": "20:15 (+01)",
              "Maghrib": "20:15 (+01)",
              "Isha": "21:44 (+01)",
              "Imsak": "04:40 (+01)",
              "Midnight": "01:20 (+01)",
              "Firstthird": "23:38 (+01)",
              "Lastthird": "03:02 (+01)"
          },
          "date": {
              "readable": "10 May 2023",
              "timestamp": "1683705661",
              "gregorian": {
                  "date": "10-05-2023",
                  "format": "DD-MM-YYYY",
                  "day": "10",
                  "weekday": {
                      "en": "Wednesday"
                  },
                  "month": {
                      "number": 5,
                      "en": "May"
                  },
                  "year": "2023",
                  "designation": {
                      "abbreviated": "AD",
                      "expanded": "Anno Domini"
                  }
              },
              "hijri": {
                  "date": "19-10-1444",
                  "format": "DD-MM-YYYY",
                  "day": "19",
                  "weekday": {
                      "en": "Al Arba'a",
                      "ar": "الاربعاء"
                  },
                  "month": {
                      "number": 10,
                      "en": "Shawwāl",
                      "ar": "شَوّال"
                  },
                  "year": "1444",
                  "designation": {
                      "abbreviated": "AH",
                      "expanded": "Anno Hegirae"
                  },
                  "holidays": []
              }
          },
          "meta": {
              "latitude": 34.2591485,
              "longitude": -5.9221253,
              "timezone": "Africa/Casablanca",
              "method": {
                  "id": 3,
                  "name": "Muslim World League",
                  "params": {
                      "Fajr": 18,
                      "Isha": 17
                  },
                  "location": {
                      "latitude": 51.5194682,
                      "longitude": -0.1360365
                  }
              },
              "latitudeAdjustmentMethod": "ANGLE_BASED",
              "midnightMode": "STANDARD",
              "school": "STANDARD",
              "offset": {
                  "Imsak": 0,
                  "Fajr": 0,
                  "Sunrise": 0,
                  "Dhuhr": 0,
                  "Asr": 0,
                  "Maghrib": 0,
                  "Sunset": 0,
                  "Isha": 0,
                  "Midnight": 0
              }
          }
      }
  ]
}
////////
function mapTableData(timesData) {
    const renderPrayerTimesIntoTable = (dayData) => {
      const {timings:{Fajr,Dhuhr,Asr,Maghrib,Isha}, date:{gregorian:{weekday:{en},day}}} = dayData
    
      const rowTemplate = `
        <tr>
            <td>${en}</td>
            <td>${day}</td>
            <td>${Fajr.slice(0,5)}</td>
            <td>${Dhuhr.slice(0,5)}</td>
            <td>${Asr.slice(0,5)}</td>
            <td>${Maghrib.slice(0,5)}</td>
            <td>${Isha.slice(0,5)}</td>
        </tr>
      `
    timesTableTBody.insertAdjacentHTML("beforeend",rowTemplate)
    }
    console.log(timesData)
    timesData.map(renderPrayerTimesIntoTable)
}


closeModal.onclick = ()=> timesTableModal.classList.remove("open")
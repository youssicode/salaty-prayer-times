//? DOM Elements References
//=========================

export const query = (selector) => document.querySelector(selector)
export const queryAll = (selector) => document.querySelectorAll(selector)

export default function dom() {
  const domElements = {
    // Location Elements
    actualLocationLabel: query(".location__actual-location-wrapper__cityName"),
    autoLocateButton: query(".location__search-wrapper__auto-locate-button"),
    locationSearchWrapper: query(".location__search-wrapper"),
    showLocationSearchWrapper: query(
      ".location__actual-location-wrapper__icon--arrow"
    ),
    searchForCityBtn: query(".search-for-city-icon"),
    locationWrapper: query(".location"),
    locationBtn: query(".location"),
    citySearchInput: query(".search-for-city-input"),
    citiesListMatch: query(".extracted-cities-list"),
    saveLocationBtn: query(".dropdown__content__link--save-location"),
    saveLocationSwitch: query(".switch__input--location"),
    saveLocationSwitchWrapper: query(".switchWrapper--save-location"),

    // Date Labels
    islamicDateLabel: query(".islamic_date"),
    gregorianDateLabel: query(".gregorian_date"),
    footerYear: query(".actual-year"),

    // Prayer Time Labels
    fajrTimeLabel: query(".prayerTimeCard__prayerTime.fajr"),
    sunriseTimeLabel: query(".prayerTimeCard__prayerTime.sunrise"),
    dhuhrTimeLabel: query(".prayerTimeCard__prayerTime.dhuhr"),
    asrTimeLabel: query(".prayerTimeCard__prayerTime.asr"),
    maghribTimeLabel: query(".prayerTimeCard__prayerTime.maghrib"),
    ishaaTimeLabel: query(".prayerTimeCard__prayerTime.ishaa"),

    // Time Labels
    mainTimeLabel: query(".timingContainer__timeDua__timeNow"),
    upcomingPrayerLabel: query(".timingContainer__upcomingPrayer__prayerName"),
    upcomingPrayerCustomBorder: query(".custom-border"),
    countDownLabel: query(".timingContainer__upcomingPrayer__remainingTime"),
    prayerTimeCards: queryAll(".prayerTimeCard"),
    prayerTimeLabels: queryAll(".prayerTimeCard__prayerTime"),

    // Adhan Elements
    adhanBells: queryAll(".prayerTimeCard__adhan"),
    adhanOverlay: query(".adhan-overlay"),
    muteAdhanButton: query(".mute-adhan-button"),
    activateAdhanSwitch: query(".switch__input--adhan"),
    activateAdhanBtn: query(".dropdown__content__link--alarm"),
    activateAdhanSwitchWrapper: query(".switchWrapper--alarm"),

    // Nearby Mosques Section
    nearbyMosquesSection: query(".nearbyMosquesSection"),
    mosquesWrapper: query(".mosquesWrapper"),
    nearbyMosquesShowBtn: query(".displayNearbyMosques__show"),
    nearbyMosquesHideBtn: query(".displayNearbyMosques__hide"),

    // Menu Elements
    navContainer: query(".nav-container"),
    menuBurgerBtn: query(".burger_btn"),
    dropDownMenu: query(".dropdown__content"),
    menuHideBtn: query(".dropdown__hide-btn"),
    restoreSettings: query(".about__body__links__link--restore-settings"),

    // Hadeeth Section
    showHadeethBtn: query(".timingContainer__timeDua__hadeeth"),
    hadeethQuote: query(".timingContainer__timeDua__hadeeth__quote"),
    hadeethGrade: query(".timingContainer__timeDua__hadeeth__grade"),
    hadeethAttribution: query(
      ".timingContainer__timeDua__hadeeth__attribution"
    ),

    // Times Table Elements
    showTimesTable: query(".dropdown__content__link--times-table"),
    timesTableModal: query(".times-table-modal-overlay"),
    closeTimesTable: query(".times-table-modal__close-btn"),
    timesTableTBody: query(".times-table-tbody"),
    monthPicker: query(".times-table__header__month-picker"),

    // About Section
    aboutModal: query(".about-modal-overlay"),
    showAboutModal: query(".dropdown__content__link--about"),
    closeAboutModal: query(".about__header__close-btn"),
  }

  return domElements
}

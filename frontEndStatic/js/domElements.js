//? DOM Elements References
//=========================

function dom() {
  const domElements = {
    actualLocationLabel: document.querySelector(
      ".location__actual-location-wrapper__cityName"
    ),
    autoLocateButton: document.querySelector(
      ".location__search-wrapper__auto-locate-button"
    ),
    islamicDateLabel: document.querySelector(".islamic_date"),
    gregorianDateLabel: document.querySelector(".gregorian_date"),
    footerYearLabel: document.querySelector(".actual-year"),
    fajrTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.fajr"),
    sunriseTimeLabel: document.querySelector(
      ".prayerTimeCard__prayerTime.sunrise"
    ),
    dhuhrTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.dhuhr"),
    asrTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.asr"),
    maghribTimeLabel: document.querySelector(
      ".prayerTimeCard__prayerTime.maghrib"
    ),
    ishaaTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.ishaa"),
    locationSearchWrapper: document.querySelector(".location__search-wrapper"),
    locationWrapper: document.querySelector(".location"),
    locationBtn: document.querySelector(".location"),
    mainTimeLabel: document.querySelector(".timingContainer__timeDua__timeNow"),
    citySearchInput: document.querySelector(".search-for-city-input"),
    citiesListMatch: document.querySelector(".extracted-cities-list"),
    upcomingPrayerLabel: document.querySelector(
      ".timingContainer__upcomingPrayer__prayerName"
    ),
    upcomingPrayerCustomBorder: document.querySelector(".custom-border"),
    countDownLabel: document.querySelector(
      ".timingContainer__upcomingPrayer__remainingTime"
    ),
    prayerTimeCards: document.querySelectorAll(".prayerTimeCard"),
    prayerTimeLabels: document.querySelectorAll(".prayerTimeCard__prayerTime"),
    adhanBells: document.querySelectorAll(".prayerTimeCard__adhan"),
    adhanOverlay: document.querySelector(".adhan-overlay"),
    muteAdhanButton: document.querySelector(".mute-adhan-button"),
    nearbyMosquesSection: document.querySelector(".nearbyMosquesSection"),
    mosquesWrapper: document.querySelector(".mosquesWrapper"),
    nearbyMosquesShowBtn: document.querySelector(".displayNearbyMosques__show"),
    nearbyMosquesHideBtn: document.querySelector(".displayNearbyMosques__hide"),
    footerYear: document.querySelector(".actual-year"),
    menuBurgerBtn: document.querySelector(".burger_btn"),
    dropDownMenu: document.querySelector(".dropdown__content"),
    menuHideBtn: document.querySelector(".dropdown__hide-btn"),
    activateAdhanSwitch: document.querySelector(".switch__input--adhan"),
    saveLocationSwitch: document.querySelector(".switch__input--location"),
    navContainer: document.querySelector(".nav-container"),
    showTimesTable : document.querySelector(".dropdown__content__link--times-table"),
    timesTableModal : document.querySelector(".times-table-modal-overlay"),
    closeTimesTable : document.querySelector(".times-table-modal__close-btn"),
    monthPicker : document.querySelector(".times-table__header__month-picker"),
    timesTableTBody : document.querySelector(".times-table-tbody"),
    
    
    aboutModal : document.querySelector(".about-modal-overlay"),
    showAboutModal : document.querySelector(".dropdown__content__link--about"),
    closeAboutModal : document.querySelector(".about__header__close-btn"),
  };

  return domElements;
}

export default dom;

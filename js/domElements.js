//? DOM Elements References
//=========================

const dom = {
    actualLocationLabel: document.querySelector(".location__actual-location-wrapper__cityName"),
    autoLocateButton: document.querySelector(".location__search-wrapper__auto-locate-button"),
    islamicDateLabel: document.querySelector(".islamic_date"),
    gregorianDateLabel: document.querySelector(".gregorian_date"),
    footerYearLabel: document.querySelector(".actual-year"),
    fajrTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.fajr"),
    sunriseTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.sunrise"),
    dhuhrTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.dhuhr"),
    asrTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.asr"),
    maghribTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.maghrib"),
    ishaaTimeLabel: document.querySelector(".prayerTimeCard__prayerTime.ishaa"),
    locationSearchWrapper: document.querySelector(".location__search-wrapper"),
    locationBtn: document.querySelector(".location"),
    mainTimeLabel: document.querySelector(".timingContainer__timeDua__timeNow"),
    citySearchInput: document.querySelector(".search-for-city-input"),
    citiesListMatch: document.querySelector(".extracted-cities-list"),
    upcomingPrayerLabel: document.querySelector(".timingContainer__upcomingPrayer__prayerName"),
    upcomingPrayerCustomBorder: document.querySelector(".custom-border"),
    countDownLabel: document.querySelector(".timingContainer__upcomingPrayer__remainingTime"),
    prayerTimeCards: document.querySelectorAll(".prayerTimeCard"),
    prayerTimeLabels: document.querySelectorAll(".prayerTimeCard__prayerTime"),
    adhanBells: document.querySelectorAll(".prayerTimeCard__adhan"),
    adhanOverlay: document.querySelector(".adhan-overlay"),
    muteAdhanButton: document.querySelector(".mute-adhan-button"),
    nearbyMosquesSection: document.querySelector(".nearbyMosquesSection"),
    nearbyMosquesShowBtn: document.querySelector(".displayNearbyMosques__show"),
    nearbyMosquesHideBtn: document.querySelector(".displayNearbyMosques__hide"),
    nearbyMosquesListWrapper: document.querySelector(".mosquesList")
};

export default dom;
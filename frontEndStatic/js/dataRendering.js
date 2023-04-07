import dom from "./domElements.js";

export const renderLocalTime = (time) => {
    dom().mainTimeLabel.innerText = time
}

export const renderIslamicCalender = (api_data) => {
    const { month, day, year } = api_data
    const islamicDate = `${month.en} ${day}, ${year}`
    dom().islamicDateLabel.innerText = islamicDate
}

export const renderGregorianDate = (date) => {
    dom().gregorianDateLabel.innerText = `${date.weekday}, ${date.monthName} ${date.day}, ${date.year}`
}

export const renderAutoLocatedCity = (adresse) => {
    const { cityName, countryShortName } = adresse
    let cityCountryName = `${cityName}, ${countryShortName}`
    dom().actualLocationLabel.innerText = cityCountryName
}

export const renderPrayerTiming = (timesArray) => {
    for (let i = 0; i < dom().prayerTimeLabels.length; i++) {
        dom().prayerTimeLabels[i].innerText = timesArray[i].prayerTime
    }
}

export const renderUpcomingPrayer = (index, content) => {
    dom().prayerTimeCards.forEach(card => {
        card.classList.remove("prayerTimeCard--nextPrayer")
    })
    dom().prayerTimeCards[index].classList.add("prayerTimeCard--nextPrayer")
    dom().upcomingPrayerLabel.innerText = content
}

export const renderUpcomingPrayerCountDown = (hours, minutes, seconds) => {
    dom().countDownLabel.innerText = `${hours}:${minutes}:${seconds}`
}
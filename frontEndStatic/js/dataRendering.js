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

export const renderUpcomingPrayerCountDown = (remainingTimeStamp) => {
    let hours = Math.floor(remainingTimeStamp / (1000 * 60 * 60))
    let minutes = Math.floor((remainingTimeStamp % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((remainingTimeStamp % (1000 * 60)) / 1000)
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    dom().countDownLabel.innerText = `${hours}:${minutes}:${seconds}`
}

export const renderCallToPrayerOverlay = () => {
    // play 'Call-To_Prayer' sound track
    let adhanSound = document.createElement('audio')
    adhanSound.setAttribute("src", "../src/audio/Adhan_Alaqsa.mp3")
    adhanSound.play()
    // Show/Hide overlay + Start/Stop Adhan
    dom().adhanOverlay.classList.remove("adhan-overlay--hidden")
    dom().upcomingPrayerCustomBorder.classList.add("animation-paused")
    dom().muteAdhanButton.addEventListener("click", stopAdhan)
    window.addEventListener("keydown", e => e.key == "Escape" ? stopAdhan() : null)
    function stopAdhan() {
        dom().upcomingPrayerCustomBorder.classList.remove("animation-paused")
        dom().adhanOverlay.classList.add("adhan-overlay--hidden")
        adhanSound.pause()
    }
}
export const renderFooterYear = (year) => {
    dom().footerYear.textContent = year
}
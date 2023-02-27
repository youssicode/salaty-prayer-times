//? Imported Modules
//==================
import * as dom from "./domElements.js";


//? Constantes and Variables
//==========================
let setIntervalStatus = false
let upComingPrayerCountDown

//? Functions
//===========

//* Check witch prayer is next & display it
export const renderUpcomingPrayerCard = (timesArray) => {
    if (setIntervalStatus == true) {
        clearInterval(upComingPrayerCountDown)
        setIntervalStatus = false
    }

    const date = new Date()
    const actualTimeStamp = date.getTime()
    let upcomingPrayerLabelContent
    let upComingPrayerTimeStamp
    let prayerTimeCard__index
    const ishaaTime = new Date(`${date.toDateString()} ${timesArray[5].prayerTime}:00`).getTime()
    // If actual time passes "Isha'a" prayer's time => render "Fajr" as upcoming prayer
    if (actualTimeStamp > ishaaTime) {
        upcomingPrayerLabelContent = "Fajr"
        //* Get timeStamp for tomorro's "Fajr" prayer: need to check if today is the last day of the month
        // The ISO 8601 syntax (YYYY-MM-DD) is also the preferred JavaScript date format
        // ISO dates can be written with added hours, minutes, and seconds (YYYY-MM-DDTHH:MM:SSZ) // 'Z' will return the time depending on local time-zone (expl: 21:36 instead of 20:36) 
        // If you want to modify the time relative to UTC, remove the Z and add +HH:MM or -HH:MM instead
        let dateTemplateMonth = date.getMonth() + 1
        dateTemplateMonth = dateTemplateMonth < 9 ? '0' + dateTemplateMonth : date.getMonth()
        const dateTemplateDay = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + 1
        const dateTemplateYear = date.getFullYear()
        const fajrTime = timesArray[0].prayerTime
        const timeTemplate = fajrTime.length < 5 ? '0' + fajrTime : fajrTime // if prayerTime's hour is 1-digit add "0" to it.
        const dateTemplate = `${dateTemplateYear}, ${dateTemplateMonth}, ${dateTemplateDay}, ${timeTemplate}`
        upComingPrayerTimeStamp = new Date(dateTemplate).getTime()
        prayerTimeCard__index = 0
    } else {
        for (let i = 0; i < timesArray.length; i++) {
            upComingPrayerTimeStamp = (new Date(`${date.toDateString()} ${timesArray[i].prayerTime}:00`)).getTime()

            if (upComingPrayerTimeStamp > actualTimeStamp && i != 1) { // '&& i != 1' To avoid displaying 'Sunrise' as upcoming prayer
                upcomingPrayerLabelContent = timesArray[i].prayerName
                prayerTimeCard__index = i
                break
            }
        }
    }
    dom.prayerTimeCards.forEach(card => {
        card.classList.remove("prayerTimeCard--nextPrayer")
    })
    dom.prayerTimeCards[prayerTimeCard__index].classList.add("prayerTimeCard--nextPrayer")
    dom.upcomingPrayerLabel.innerText = upcomingPrayerLabelContent
    startCountDown(upComingPrayerTimeStamp, prayerTimeCard__index, timesArray)
}

//* Count-down time until next prayer
const startCountDown = (upComingPrayerTime, index, timesArray) => {
    let remainingTimeStamp, hours, minutes, seconds
    upComingPrayerCountDown = setInterval(() => {
        setIntervalStatus = true
        let timeNow = new Date().getTime()
        remainingTimeStamp = (upComingPrayerTime - timeNow)

        if (remainingTimeStamp <= 0) {
            clearInterval(upComingPrayerCountDown)
            setIntervalStatus = false
            startCallToPrayer(index)
            renderUpcomingPrayerCard(timesArray)
            return
        }

        hours = Math.floor(remainingTimeStamp / (1000 * 60 * 60))
        minutes = Math.floor((remainingTimeStamp % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((remainingTimeStamp % (1000 * 60)) / 1000)
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        dom.countDownLabel.innerText = `${hours}:${minutes}:${seconds}`
    }, 1000);
}

const startCallToPrayer = (index) => {
    if (dom.adhanBells[index].classList.contains("prayerTimeCard__adhan--disabled")) return
    // play 'Call-To_Prayer' sound track
    let adhanSound = document.createElement('audio')
    adhanSound.setAttribute("src", "../src/audio/Adhan_Alaqsa.mp3")
    adhanSound.play()
    // Start/Stop Adhan + Show/Hide overlay
    dom.adhanOverlay.classList.remove("adhan-overlay--hidden")
    dom.muteAdhanButton.addEventListener("click", stopAdhan)
    window.addEventListener("keydown", e => e.key == "Escape" ? stopAdhan() : null)
    function stopAdhan() {
        dom.adhanOverlay.classList.add("adhan-overlay--hidden")
        adhanSound.pause()
    }
}

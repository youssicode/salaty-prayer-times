//? Imported Modules
//==================
import * as dom from "./domElements.js";


//? Main Functions
//================

//* Check witch prayer is next & display it
export const renderUpcomingPrayerCard = (savedPrayerTimes) => {
    const date = new Date()
    const actualTimeStamp = date.getTime()
    let upcomingPrayerLabelContent
    let upComingPrayerTimeStamp
    let prayerTimeCard__index
    const ishaaTime = new Date(`${date.toDateString()} ${savedPrayerTimes[5].prayerTime}:00`).getTime()
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
        const timeTemplate = (savedPrayerTimes[0].prayerTime).length < 5 ? '0' + savedPrayerTimes[0].prayerTime : savedPrayerTimes[0].prayerTime // if prayerTime's hour is 1-digit add "0" to it.
        const dateTemplate = `${dateTemplateYear}-${dateTemplateMonth}-${dateTemplateDay}T${timeTemplate}:00` // :00 is optional
        upComingPrayerTimeStamp = new Date(dateTemplate).getTime()
        prayerTimeCard__index = 0
    } else {
        for (let i = 0; i < savedPrayerTimes.length; i++) {
            upComingPrayerTimeStamp = (new Date(`${date.toDateString()} ${savedPrayerTimes[i].prayerTime}:00`)).getTime()

            if (upComingPrayerTimeStamp > actualTimeStamp && i != 1) { // '&& i != 1' To avoid displaying 'Sunrise' as upcoming prayer
                upcomingPrayerLabelContent = savedPrayerTimes[i].prayerName
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
    startCountDown(upComingPrayerTimeStamp, prayerTimeCard__index, savedPrayerTimes)
}

//* Count-down time until next prayer
const startCountDown = (upComingPrayerTime, index, savedPrayerTimes) => {
    let remainingTimeStamp, hours, minutes, seconds
    let upComingPrayerCountDown = setInterval(() => {
        let timeNow = new Date().getTime()
        remainingTimeStamp = (upComingPrayerTime - timeNow)

        if (remainingTimeStamp <= 0) {
            clearInterval(upComingPrayerCountDown)
            startCallToPrayer(index)
            renderUpcomingPrayerCard(savedPrayerTimes)
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
    if (dom.adhanBell[index].classList.contains("prayerTimeCard__adhan--disabled")) return
    // play 'Call-To_Prayer' audio file
    let adhan = document.createElement('audio')
    adhan.setAttribute("src", "../src/audio/Adhan_Alaqsa.mp3")
    adhan.play()
}

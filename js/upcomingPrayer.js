//? Imported Modules
//==================
import * as dom from "./domElements.js";


//? Main Functions
//================

// Check & display witch prayer is next
export const renderUpcomingPrayerCard = (savedPrayerTimes) => {
    const date = new Date()
    const actualTimeStamp = date.getTime()
    let upcomingPrayerLabelContent
    let upComingPrayerTimeStamp
    const ishaaTime = new Date(`${date.toDateString()} ${savedPrayerTimes[5].prayerTime}`).getTime()
    // If actual time passes "Isha'a" prayer's time => render "Fajr" as upcoming prayer
    if (actualTimeStamp > ishaaTime) {
        upcomingPrayerLabelContent = "Assobh!"
        //* Get timeStamp for tomorro's "Fajr" prayer: need to check if today is the last day of the month
        upComingPrayerTimeStamp = (new Date(`${date.getMonth()}-${date.getDate() + 1}-${date.getFullYear()} ${savedPrayerTimes[0].prayerTime}`)).getTime()
    } else {
        for (let i = 0; i < savedPrayerTimes.length; i++) {
            upComingPrayerTimeStamp = (new Date(`${date.toDateString()} ${savedPrayerTimes[i].prayerTime}`)).getTime()
            if (upComingPrayerTimeStamp > actualTimeStamp) {
                upcomingPrayerLabelContent = savedPrayerTimes[i].prayerName
                break
            }
        }
    }
    dom.upcomingPrayerLabel.innerText = upcomingPrayerLabelContent
    startCountDown(upComingPrayerTimeStamp)
}

// Count-down time until next prayer
const startCountDown = (upComingPrayerTime) => {
    let remainingTimeStamp, hours, minutes, seconds
    let upComingPrayerCountDown = setInterval(() => {
        let timeNow = new Date().getTime()
        remainingTimeStamp = (upComingPrayerTime - timeNow)
        hours = Math.floor(remainingTimeStamp / (1000 * 60 * 60))
        minutes = Math.floor((remainingTimeStamp % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((remainingTimeStamp % (1000 * 60)) / 1000)
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        dom.countDownLabel.innerText = `${hours}:${minutes}:${seconds}`

        if (remainingTimeStamp <= 0) {
            clearInterval(upComingPrayerCountDown)
            renderUpcomingPrayerCard()
        }
    }, 1000);
}
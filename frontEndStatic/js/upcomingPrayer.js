//? Imported Modules
//==================
import { renderUpcomingPrayer, renderUpcomingPrayerCountDown, renderCallToPrayerOverlay } from "./dataRendering.js";
import dom from "./domElements.js"; // default object

//? Global Constantes and Variables
//=================================
let setIntervalStatus = false
let upComingPrayerCountDown
let prayerTimeCard__index
let timesArray

//? Functions
//===========

//* Check witch prayer is next & display it
export const renderUpcomingPrayerCard = (passedArray, time_zone) => {
    timesArray = passedArray || []
    if (setIntervalStatus) {
        clearInterval(upComingPrayerCountDown)
        setIntervalStatus = false
    }
    const dateTimeZone = new Date().toLocaleString('default', { timeZone: time_zone, hour12: false });
    //!Did not get the local time!!!!! const dateTimeZone = new Date().toString('en-US', { timeZone: time_zone, hour12: false });
    const date = new Date(dateTimeZone)
    const actualTimeStamp = date.getTime()
    let upcomingPrayerLabelContent
    let upComingPrayerTimeStamp
    const ishaaTimeStamp = new Date(`${date.toDateString()} ${timesArray[5].prayerTime}:00`).getTime()
    // If actual time passes "Isha'a" prayer's time => render "Fajr" as upcoming prayer
    if (actualTimeStamp > ishaaTimeStamp) {
        upcomingPrayerLabelContent = "Fajr"
        //* Get timeStamp for tomorro's "Fajr" prayer:
        const dateTemplateMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 // get ACTUAL month in 2-digit number
        const dateTemplateDay = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)) // get Tomorro's day in 2-digit number
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
    renderUpcomingPrayer(prayerTimeCard__index, upcomingPrayerLabelContent)
    startCountDown(upComingPrayerTimeStamp, time_zone)
}

//* Count-down time until next prayer
const startCountDown = (upComingPrayerTimeStamp, time_zone) => {
    setIntervalStatus = true
    upComingPrayerCountDown = setInterval(() => {
        const dateTimeZone = new Date().toLocaleString('en-US', { timeZone: time_zone, hour12: false });
        let nowTimeStamp = new Date(dateTimeZone).getTime()
        const remainingTimeStamp = (upComingPrayerTimeStamp - nowTimeStamp)

        if (remainingTimeStamp <= 0) {
            clearInterval(upComingPrayerCountDown)
            setIntervalStatus = false
            startCallToPrayer(prayerTimeCard__index)
            renderUpcomingPrayerCard(timesArray, time_zone)
            return
        }
        renderUpcomingPrayerCountDown(remainingTimeStamp)
    }, 1000);
}

const startCallToPrayer = () => {
    if (dom().adhanBells[prayerTimeCard__index].classList.contains("prayerTimeCard__adhan--disabled")) return
    renderCallToPrayerOverlay()
}


// export const renderUpcomingPrayerCard = (passedArray, passedDate, time_zone) => {
//     timesArray = passedArray || []
//     if (setIntervalStatus) {
//         clearInterval(upComingPrayerCountDown)
//         setIntervalStatus = false
//     }

//     //! const date = new Date()

//     const options = {
//         timeZone: time_zone,
//         hour12: false,
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric'
//     };
//     const new_time = new Date().toLocalTimeString('en-US', options).slice(0, 8);
//     console.log("new Time", new_time)//!


//     const date = new Date(`${passedDate} ${new_time}`)
//     const actualTimeStamp = date.getTime()
//     let upcomingPrayerLabelContent
//     let upComingPrayerTimeStamp
//     //////////////////////////////////77
//     const ishaaTime = new Date(`${date.toDateString()} ${timesArray[5].prayerTime}:00`).getTime()
//     //! const ishaaTime = new Date(`${passedDate} ${timesArray[5].prayerTime}:00`).getTime()
//     console.log("actualTimeStamp", actualTimeStamp)//!
//     console.log("ishaaTime", ishaaTime) //!
//     ////////////////////////////////////
//     // If actual time passes "Isha'a" prayer's time => render "Fajr" as upcoming prayer
//     if (actualTimeStamp > ishaaTime) {
//         upcomingPrayerLabelContent = "Fajjjr"//! fajjjr
//         //* Get timeStamp for tomorro's "Fajr" prayer:
//         const dateTemplateMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 // get ACTUAL month in 2-digit number
//         const dateTemplateDay = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)) // get Tomorro's day in 2-digit number
//         const dateTemplateYear = date.getFullYear()
//         const fajrTime = timesArray[0].prayerTime
//         const timeTemplate = fajrTime.length < 5 ? '0' + fajrTime : fajrTime // if prayerTime's hour is 1-digit add "0" to it.
//         const dateTemplate = `${dateTemplateYear}, ${dateTemplateMonth}, ${dateTemplateDay}, ${timeTemplate}`
//         upComingPrayerTimeStamp = new Date(dateTemplate).getTime()
//         prayerTimeCard__index = 0
//     } else {
//         for (let i = 0; i < timesArray.length; i++) {
//             upComingPrayerTimeStamp = (new Date(`${date.toDateString()} ${timesArray[i].prayerTime}:00`)).getTime()

//             if (upComingPrayerTimeStamp > actualTimeStamp && i != 1) { // '&& i != 1' To avoid displaying 'Sunrise' as upcoming prayer
//                 upcomingPrayerLabelContent = timesArray[i].prayerName
//                 prayerTimeCard__index = i
//                 break
//             }
//         }
//     }
//     renderUpcomingPrayer(prayerTimeCard__index, upcomingPrayerLabelContent)
//     startCountDown(upComingPrayerTimeStamp)
// }

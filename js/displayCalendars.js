//? Imported Modules
//==================

import { errorHandler } from "./errorHandler.js";
import * as dom from "./domElements.js";

//? Display the time now
//======================

export const displayTime = (time) => {
    dom.mainTimeLabel.innerText = time
}

//? Display Gregorian Dates
//=========================

export const displayGregorianDate = (date) => {
    dom.gregorianDateLabel.innerText = `${date.weekday}, ${date.monthName} ${date.day}, ${date.year}`
}

//? Get and display Islamic dates
//===============================

export const displayIslamicDate = async (date) => {

    const grego_date = `${date.day}-${date.month}-${date.year}`
    const islamicCalendarResult = await getIslamicCalendar(grego_date)
    if (islamicCalendarResult) {
        const islamicDate = `${islamicCalendarResult.month.en} ${islamicCalendarResult.day}, ${islamicCalendarResult.year}`
        dom.islamicDateLabel.innerText = islamicDate
    } else {
        let err = new Error("Islamic calendar unavailable") // Create custom error object
        err.code = 99
        errorHandler(err)
    }
}

//? Converting Gregorian date to Islamic date
//==========================================

async function getIslamicCalendar(gregorian) {
    let apiUrl = `http://api.aladhan.com/v1/gToH?date=${gregorian}`
    let response = await axios({
        method: "GET",
        url: apiUrl,
    })
    if (response.status >= 200 && response.status < 300) {
        return response.data.data.hijri
    } else {
        throw Error("Unable to get islamic date.")
    }
}

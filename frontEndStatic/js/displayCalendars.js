//? Imported Modules
//==================
import errorHandler from "./errorHandler.js";
import { renderIslamicCalender, renderGregorianDate } from "./dataRendering.js";


//? Functions
//===========
//* Get and display Islamic date
export const getIslamicDate = async (date) => {
    const toDay = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    }
    const grego_date = `${toDay.day}-${toDay.month}-${toDay.year}`

    const islamicCalendarResult = await getIslamicCalendar(grego_date)
    if (islamicCalendarResult) {
        renderIslamicCalender(islamicCalendarResult)
    } else {
        let err = new Error("Islamic calendar unavailable") // Create custom error object
        err.code = 99
        errorHandler(err)
    }
}
//* Get and display Gregorian date
export const refreshGregorianDate = (time_zone) => {
    const options = {
        timeZone: time_zone,
    };
    const new_zone_date_string = new Date().toLocaleString('en-US', options)
    const date = new Date(new_zone_date_string)
    renderGregorianDate(date)
}
//* Converting Gregorian date to Islamic date
async function getIslamicCalendar(gregorian) {
    let apiUrl = `https://api.aladhan.com/v1/gToH?date=${gregorian}`
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


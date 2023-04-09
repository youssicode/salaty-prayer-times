//? Imported Modules
//==================
import errorHandler from "./errorHandler.js";
import { renderIslamicCalender } from "./dataRendering.js";


//? Functions
//===========
//* Get and display Islamic dates
export const getIslamicDate = async (date) => {

    const grego_date = `${date.day}-${date.month}-${date.year}`
    const islamicCalendarResult = await getIslamicCalendar(grego_date)
    if (islamicCalendarResult) {
        renderIslamicCalender(islamicCalendarResult)
    } else {
        let err = new Error("Islamic calendar unavailable") // Create custom error object
        err.code = 99
        errorHandler(err)
    }
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


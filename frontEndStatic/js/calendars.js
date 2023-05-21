//? Imported Modules
//==================
import errorHandler from "./errorHandler.js";
import { renderIslamicCalender, renderGregorianDate } from "./dataRendering.js";


//? Functions
//===========
//* Get and display Gregorian date
export const refreshGregorianDate = (time_zone) => {
    const options = {
        timeZone: time_zone,
    };
    const new_zone_date_string = new Date().toLocaleString('en-US', options)
    const date = new Date(new_zone_date_string)
    renderGregorianDate(date)
}

//* Get and display Islamic date
export const getIslamicDate = async (date) => {
    const toDay = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    }
    const grego_date = `${toDay.day}-${toDay.month}-${toDay.year}`

    const islamicDate = await fetchIslamicCalendar(grego_date)
    if (islamicDate) {
        renderIslamicCalender(islamicDate)
    } else {
        const err = new Error("Islamic calendar unavailable") // Create custom error object
        err.code = 99
        errorHandler(err)
    }
}
//* Converting Gregorian date to Islamic date
async function fetchIslamicCalendar(gregorian) {
    try {
        const { data, status } = await axios.get('/islamic-date', { params: { gregorian } });
        if (status >= 200 && status < 300) {
            return data
        }
    } catch (err) {
        errorHandler(err)
        throw err // re-throw the error to return a rejected promise
    }
}


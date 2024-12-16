//? Imported Modules
//==================
import { query } from "./domElements.js" // default export
import { getDataFromLocalStorage } from "./localStorage.js"

//? Functions
//===========
const timesTableModal = query(".times-table-modal-overlay")
export const renderTimesTableModalOverlay = () => {
  const dropDownMenu = query(".dropdown__content")
  dropDownMenu.classList.remove("visible")
  timesTableModal.classList.add("open")
  document.body.classList.add("noscroll") // Prevent the main page from scrolling

  //* get current month and put its name in the select list + fetch data according to it
  const currentMonthIndex = new Date().getMonth()
  const monthPicker = query(".times-table__header__month-picker")
  monthPicker.selectedIndex = currentMonthIndex
  renderTableData(currentMonthIndex + 1)
}

export async function renderTableData(month) {
  const dataTable = await fetchTableData(month)
  mapTableData(dataTable)
}
const fetchTableData = async (month) => {
  const { latitude, longitude } = getDataFromLocalStorage("locationCoordinates")
  const { data } = await axios("/times-table", {
    params: { month, latitude, longitude },
  })
  return data
}

function mapTableData(dataTable) {
  dataTable.map((dayData) => {
    const { weekday: en, day, Fajr, Dhuhr, Asr, Maghrib, Isha } = dayData
    let rowTag = "<tr>"
    const toDay = new Date().getDate()
    if (day == toDay) {
      // note that 'day' is a string and 'toDay' is a number
      rowTag = '<tr class="today">'
    }
    const rowTemplate = `
        ${rowTag}
            <td>${en}</td>
            <td>${day}</td>
            <td>${Fajr.slice(0, 5)}</td>
            <td>${Dhuhr.slice(0, 5)}</td>
            <td>${Asr.slice(0, 5)}</td>
            <td>${Maghrib.slice(0, 5)}</td>
            <td>${Isha.slice(0, 5)}</td>
        </tr>
    `
    query(".times-table-tbody").insertAdjacentHTML("beforeend", rowTemplate)
  })
}

export const closeTimesTableModal = () => {
  document.body.classList.remove("noscroll")
  timesTableModal.classList.remove("open")
}

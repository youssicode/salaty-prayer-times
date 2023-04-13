//? Imported Modules
//==================
import { clearChildren, renderCitiesList } from "./dataRendering.js";
import dom from "./domElements.js";


//? Functions
//===========

export function autoCompleteCitiesList() {
    clearChildren(dom().citiesListMatch)
    const userEntry = dom().citySearchInput.value.trim()
    if (userEntry.length < 2) return // Auto-Complete function began after typing 2 characters or more
    renderCitiesList(userEntry)
}
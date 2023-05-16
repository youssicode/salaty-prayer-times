//? Imported Modules
//==================
import dom from "./domElements.js"; // default export
// import { getDataFromLocalStorage } from "./localStorage.js";

//? Functions
//===========
export const renderAboutModalOverlay = () => {
    dom().dropDownMenu.classList.remove("visible")
    dom().aboutModal.classList.add("open")
    document.body.classList.add("noscroll") // Prevent the main page from scrolling
}

export const closeAboutModal = () => {
    document.body.classList.remove("noscroll")
    dom().aboutModal.classList.remove("open")
}
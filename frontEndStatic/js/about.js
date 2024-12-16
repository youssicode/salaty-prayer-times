//? Imported Modules
//==================
import { query } from "./domElements.js"

//? Functions
//===========
const aboutModal = query(".about-modal-overlay")
export const renderAboutModalOverlay = () => {
  const dropDownMenu = query(".dropdown__content")
  dropDownMenu.classList.remove("visible")
  aboutModal.classList.add("open")
  document.body.classList.add("noscroll") // Prevent the main page from scrolling
}

export const closeAboutModal = () => {
  document.body.classList.remove("noscroll")
  aboutModal.classList.remove("open")
}

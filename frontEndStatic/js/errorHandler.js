//? Imported Modules
//==================
import { query } from "./domElements.js"

//? DOM Elements
//==============
const locationBtn = query(".location")
const locationSearchWrapper = query(".location__search-wrapper")
const nearbyMosquesSection = query(".nearbyMosquesSection")
const gregorianDateLabel = query(".gregorian_date")

//? Functions
//===========
const errorHandler = (error) => {
  let errorMessage = "Unknown error."
  switch (error.code) {
    case "ERR_NETWORK":
      alert("Oups! Network Error.")
      break
    case "ERR_BAD_REQUEST":
      errorMessage = "Bad request. Unkown area or bad parameters."
      break
    case 1:
      errorMessage =
        "Oops! location off. Please turn it on, or enter a city manually."
      showErrorMessage(errorMessage, locationBtn)
      break
    case 2:
      errorMessage = "Location unavailable. Please check your network."
      showErrorMessage(errorMessage, locationBtn)
      break
    case 3:
      errorMessage = "Request timeout."
      showErrorMessage(errorMessage, locationBtn)
      break
    case 66:
      errorMessage = error.message
      showErrorMessage(errorMessage, locationSearchWrapper)
      break
    case 77:
      errorMessage = error.message
      showErrorMessage(errorMessage, locationBtn)
      break
    case 88:
      errorMessage = error.message
      showErrorMessage(errorMessage, nearbyMosquesSection)
      break
    case 99:
      errorMessage = "Islamic calendar unavailable."
      showErrorMessage(errorMessage, gregorianDateLabel)
      break
  }
}

// function takes a message and appends an error-label div containing the message to a provided position element
const showErrorMessage = (message, position) => {
  // Hide any previous messages
  hideErrorMessage()

  //*Method 1
  const errorLabel = document.createElement("div")
  errorLabel.classList.add("error-label")
  errorLabel.textContent = message
  position.appendChild(errorLabel)

  //*Method 2
  // const errorLabel = `<div class='error-label'>${message}</div>`
  // position.insertAdjacentHTML("beforeEnd", errorLabel)

  //*Method 3(not recommanded: can cause re-instancing DOM elements issue )
  // const errorLabel = `<div class='error-label'>${message}</div>`
  // position.innerHTML += errorLabel
}

export const hideErrorMessage = () => {
  const errorLAbel = document.querySelector(".error-label")
  errorLAbel ? errorLAbel.remove() : null // Hide error message if it exist
}

export default errorHandler

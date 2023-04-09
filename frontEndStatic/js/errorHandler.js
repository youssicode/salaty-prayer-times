//? Imported Modules
//==================
import dom from "./domElements.js";

//? Functions
//===========
const errorHandler = (error) => {
    let errorMessage = "Unknown error."
    switch (error.code) {

        case 'ERR_NETWORK':
            alert("Oups! Network Error.")
            break;
        case 'ERR_BAD_REQUEST':
            errorMessage = "Bad request. Unkown area or bad parameters."
            break;
        case 1:
            errorMessage = "Please turn on location, or enter a city manually."
            showErrorMessage(errorMessage, dom().locationBtn)
            break;
        case 2:
            errorMessage = "Location unavailable."
            showErrorMessage(errorMessage, dom().locationBtn)
            break;
        case 3:
            errorMessage = "Request timeout."
            showErrorMessage(errorMessage, dom().locationBtn)
            break;
        case 77:
            errorMessage = error.message
            showErrorMessage(errorMessage, dom().locationBtn)
            break;
        case 88:
            errorMessage = error.message
            showErrorMessage(errorMessage, dom().nearbyMosquesSection)
            break;
        case 99:
            errorMessage = "Islamic calendar unavailable."
            showErrorMessage(errorMessage, dom().gregorianDateLabel)
            break;
    }
}

// function takes a message and appends an error-label div containing the message to a provided position element
const showErrorMessage = (message, position) => {
    const errorLabel = document.createElement('div');
    errorLabel.classList.add('error-label');
    errorLabel.textContent = message;
    position.appendChild(errorLabel);
}

export default errorHandler
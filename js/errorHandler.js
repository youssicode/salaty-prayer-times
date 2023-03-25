import dom from "./domElements.js";


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
            showErrorMessge(errorMessage, dom.locationBtn)
            break;
        case 2:
            errorMessage = "Location unavailable."
            showErrorMessge(errorMessage, dom.locationBtn)
            break;
        case 3:
            errorMessage = "Request timeout."
            showErrorMessge(errorMessage, dom.locationBtn)
            break;
        case 88:
            errorMessage = error.message
            showErrorMessge(errorMessage, dom.nearbyMosquesSection)
            break;
        case 99:
            errorMessage = "Islamic calendar unavailable."
            showErrorMessge(errorMessage, dom.gregorianDateLabel)
            break;
    }
}

const showErrorMessge = (message, position) => {
    position.innerHTML += `
    <div class="error-label">${message}</div>
    `
}

export default errorHandler
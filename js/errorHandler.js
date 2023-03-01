import dom from "./domElements.js";


export const errorHandler = (error) => {
    let errorMessage = "Unknown error."
    switch (error.code) {

        case 'ERR_NETWORK':
            errorMessage = "Network Error."
            break;
        case 'ERR_BAD_REQUEST':
            errorMessage = "Bad request. Unkown area or bad parameters."
            break;
        case 1:
            errorMessage = "Permission denied. Please check location access permission or enter a city manually."
            actualLocationLabel.innerText = 'Undetected Location'
            break;
        case 2:
            errorMessage = "Location unavailable."
            actualLocationLabel.innerText = 'Location unavailable'
            break;
        case 3:
            errorMessage = "Request timeout."
            actualLocationLabel.innerText = 'Location unavailable'
            break;
        case 3:
            errorMessage = "Request timeout."
            break;
        case 99:
            errorMessage = "Islamic calendar unavailable."
            break;
    }
    alert("Oups! " + errorMessage)
}
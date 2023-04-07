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
/*
If we use innerHTML property to add "<div class="error-label">Please turn on location, or enter a city manually.</div>"
, the 'citySearchInput' element will not remain the same after adding a new element to 'locationBtn' wrapper.
When you add a new element to the DOM using innerHTML, the browser will RECREATE the DOM subtree for the 'locationBtn' element,
which means that the old 'citySearchInput' element that has an 'input' event Listner will be replaced by a new element/instance.
Since the new instance was not present in the DOM when the code that sets up the event listener was executed, the event listener will not be attached to the new element.
Therefore, writing caracters in the 'citySearchInput' will not trigger the autoCompleteCitiesList() function, even if it has the same class name as the old element. 
If you want to attach an event listener to the new instance, you need to do so after the new element has been added to the DOM, 
OR avoid using 'innerHTML' and use DOM methods instead (create, append,...) 
*/
const showErrorMessage = (message, position) => {
    const errorLabel = document.createElement('div');
    errorLabel.classList.add('error-label');
    errorLabel.textContent = message;
    position.appendChild(errorLabel);
}


export default errorHandler
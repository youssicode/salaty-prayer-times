//? Imported Modules
//==================

import errorHandler from "./errorHandler.js"
import dom from "./domElements.js"


//? Functions
//===========

const renderNearbyMosquesList = async (coords) => {
    if (!coords) {
        const locationError = new Error("Location shoud be defined first.")
        locationError.code = 88
        errorHandler(locationError)
        return
    }
    const mosquesList = await getNearbyMosques(coords)
    if (mosquesList) {
        dom().nearbyMosquesSection.classList.add("nearbyMosquesBtnClicked") //show area that will contain list of mosques and the map
        displayMosquesList(mosquesList, coords)
        //* add EventListener to Remove Nearby Mosques List 
        dom().nearbyMosquesHideBtn.addEventListener("click", () => {
            dom().mosquesWrapper.innerHTML = ""
            dom().nearbyMosquesSection.classList.remove("nearbyMosquesBtnClicked")
        })
    }
}

async function getNearbyMosques(coords) {
    try {
        const options = {
            method: 'GET',
            url: '/places',
            params: {
                lat: coords.latitude,
                lng: coords.longitude
            }
        };
        const { data: { results } } = await axios.request(options)
        return results.slice(0, 6)
        // const response = await axios.request(options)
        // return response.data.results.slice(0, 6)
    } catch (err) {
        errorHandler(err)
    }
}


const displayMosquesList = (mosquesList, currentCoordinates) => {
    const mosquesMarkers = []
    const domMosquesCardsWrap = document.createElement("ul")
    domMosquesCardsWrap.className = "mosquesList"
    dom().mosquesWrapper.appendChild(domMosquesCardsWrap)

    const { latitude: lat, longitude: lng } = currentCoordinates
    const currentLocation = { lat, lng }

    mosquesList.forEach(({ geometry: { location }, name }) => {
        const { lat: mosqueLat, lng: mosqueLng } = location
        mosquesMarkers.push({ lat: mosqueLat, lng: mosqueLng })

        const distance = haversineCalcDistance([lat, lng], [mosqueLat, mosqueLng])

        const mosqueCardTemplate = `
        <li class="mosqueInformationsCard">
          <div class="mosqueInformationsCard__mosque-icon fa-solid fa-mosque"></div>
          <div class="mosqueInformationsCard__title">
            <h4 class="mosqueInformationsCard__title__mosque-name">${name}</h4>
            <p class="mosqueInformationsCard__title__city">${dom().actualLocationLabel.textContent.slice(0, -4)}</p>
          </div>
          <div class="mosqueInformationsCard__distanceWrapper">
            <div class="mosqueInformationsCard__distanceWrapper__direction-icon fa-solid fa-diamond-turn-right"></div>
            <p class="mosqueInformationsCard__distanceWrapper__distance">${distance} meters</p>
          </div>
        </li>
      `
        domMosquesCardsWrap.innerHTML += mosqueCardTemplate
    })

    const mapContainer = document.createElement("aside")
    mapContainer.id = "map"
    dom().mosquesWrapper.appendChild(mapContainer)

    displayMosquesMarkersOnMap(currentLocation, mosquesMarkers, mapContainer)
}


const displayMosquesMarkersOnMap = (currentLocation, mosquesMarkers, mapContainer) => {
    function initMap() {
        // Defining tha map and its params
        const map = new google.maps.Map(mapContainer, {
            zoom: 14,
            center: currentLocation,
        });
        // putting Markers
        mosquesMarkers.forEach(markerCoords => {
            const image =
                "../src/images/icons8-mosque-35.png";
            const beachMarker = new google.maps.Marker({
                position: markerCoords,
                map,
                icon: image,
            });
        });
    }
    initMap(); // Execute the function
}

// Calculate the distance between to positions using "Heversine Formula"
const haversineCalcDistance = ([lat1, long1], [lat2, long2]) => {
    const toRadian = angle => angle * (Math.PI / 180);
    const distanceAB = (a, b) => (a - b) * (Math.PI / 180);
    const earth_radius_km = 6371;

    const dLat = distanceAB(lat2, lat1);
    const dLon = distanceAB(long2, long1);
    // convert latitudes to Radian
    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = earth_radius_km * c;

    return Math.round(finalDistance * 1000); // in meters
};



export default renderNearbyMosquesList
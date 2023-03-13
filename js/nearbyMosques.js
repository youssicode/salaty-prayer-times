//? Imported Modules
//==================
import google_key from "./apiKeys.js"

export async function getNearbyMosques(coords) {

    const options = {
        method: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&type=mosque&key=${google_key}&rankby=distance`,
    };
    const response = await axios.request(options)
    console.log("Google API Response:", response.data.results.slice(0, 10))
    // return response.data
}


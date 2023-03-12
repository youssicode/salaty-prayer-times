//? Imported Modules
//==================
import google_key from "./apiKeys.js"

export async function getNearbyMosques() {

    const options = {
        method: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.2591485,-5.9221253&type=mosque&key=${google_key}&rankby=distance`,
    };
    const response = await axios.request(options)
    console.log("Google API Response:", response.data.results)
    // return response.data
}


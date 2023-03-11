//? Imported Modules
//==================
import google_key from "./apiKeys.js"

export async function getNearbyMosques() {

    console.log("Google N.Mosques API Res:....................!")
    const options = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.2591485,-5.9221253&type=mosque&key=AIzaSyAhf7kC_ayFc99YrKDhJLl_xlzeuOBFfxI&rankby=distance',
        // params: { location: '34.2591485,-5.9221253', type: 'mosque', rankby: 'distance', Key: `${google_key}` }
    };
    const response = await axios.request(options)
    console.log("Google N.Mosques API Res:", response.data)
    // return response.data
}
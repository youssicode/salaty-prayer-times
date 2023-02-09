//* Geting the User's geolocation coordinates

export async function getUserLocationCoordinates() {
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            pos => resolve(pos), // Success CallBack Method's parameter
            err => reject(err)  // Error CallBack Method's parameter
        )
        //* OR simply:
        //* navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
}
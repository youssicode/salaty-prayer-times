//* Get Cities

export async function getCities(countryName) {
    try {
        let apiUrl = "https://countriesnow.space/api/v0.1/countries/cities";
        let dataBody = { "country": countryName }
        let citiesList = await axios({
            method: "POST",
            url: apiUrl,
            headers: { 'Content-Type': 'application/json' },
            data: dataBody
        })
        return citiesList.data.data
    } catch (err) {
        throw err
    }
}

//* Get Cities

export async function getCountries() {
    try {
        let apiUrl = "https://countriesnow.space/api/v0.1/countries";
        let countriesList = await axios({
            method: "GET",
            url: apiUrl
        })
        return countriesList.data.data
    } catch (err) {
        throw err
    }
}
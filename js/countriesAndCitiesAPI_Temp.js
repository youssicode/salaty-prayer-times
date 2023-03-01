//? Functions
//===========

//* Get Countries List

const getCountriesList = async () => {
    let countriesList = await getCountries()
    //List of Countries in Array Object
    console.log(countriesList)
}

//* Get Cities List From specifyed Country Name

const getCitiesFromCountryName = async (countryName) => {
    let citiesList = await getCities(countryName)
    //List of cities in Array Object
    console.log(citiesList)
}


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

//* Create an array of all Cities with country name

const saveCitiesTable = async () => {
    let countriesList = await getCountries()
    let citiesTable = []
    console.log(countriesList)
    countriesList.forEach(el => {
        for (let i = 0; i < el.cities.length; i++) {
            const entry = `${el.cities[i]}, ${el.iso2}=${el.country}`
            citiesTable.push(entry)
        }
    });
    return citiesTable
}
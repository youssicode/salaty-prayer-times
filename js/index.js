// Import Axios Module
// const axios = require('axios') // Work with node.js but NOT with v. javascript in front-end

// Imported Functions
import { prayerTimesByCity, prayerTimesByLocationCoordinates } from "./prayerTimesAPI.js";
import { getUserLocationCoordinates } from "./autoLocationAPI.js";
import { getAdresse } from "./GoogleMapGeoAPI.js";


//! Temp. data to get dynamically
let choosenZone = {
    city: "Rabat",
    country: "Morocco",
    latitude: "33.9715904",
    longitude: "-6.8498129"
}
// const myDate = new Date();
// console.log(myDate)
// console.log(myDate.toLocaleDateString())
// console.log(myDate.toJSON())
// console.log(myDate.toJSON().slice(0, 10))
// console.log(myDate.getDay()) // 2 = Tuesday
// console.log(myDate.getDate()) // 7 = day number
// console.log(myDate.getMonth()) // 2 = month number (0 = Jan, 1= Feb)
// console.log(myDate.getFullYear()) // 2023

let toDay = new Date()
let actualMonth = toDay.getMonth() + 1
let actualYear = toDay.getFullYear()

//* Get prayer times By specifying a city
let getPrayerTimesByCity = async function () {
    try {
        console.log(await prayerTimesByCity(choosenZone, actualMonth, actualYear))
    } catch (err) {
        errorHandler(err)
    }
}

//*  Get prayer times By auto locate the user's position coordinates

let getPrayerTimesByLocationCoordinates = async function () {
    try {
        let coordinates = await getUserLocationCoordinates()
        //! Ligne to remove
        document.querySelector(".temp-coords").innerText = `Lat: ${coordinates.latitude} / Long: ${coordinates.longitude}`
        //? Result to manipulate & use
        console.log(await prayerTimesByLocationCoordinates(coordinates.latitude, coordinates.longitude, toDay))
    } catch (err) {
        errorHandler(err)
    }
}

//* Get the ocal adresse by "Reverse Geocoding" (from user's position coordinates)

let autoLocatedCity = async () => {
    try {
        let coordinates = await getUserLocationCoordinates()
        // let cityName = await getAddress(coords.latitude, coords.longitude)
        let cityName = await getAdresse(coordinates.latitude, coordinates.longitude)
        console.log("G.API result:", cityName)

    } catch (err) {
        errorHandler(err)
    }
}


const errorHandler = (error) => {
    let errorMessage = "Unknown error."
    switch (error.code) {

        case 'ERR_NETWORK':
            errorMessage = "Network Error."
            break;
        case 'ERR_BAD_REQUEST':
            errorMessage = "Bad request. Unkown area or bad parameters."
            break;
        case 1:
            errorMessage = "Permission denied. Please allow the app to access your location in your browser settings."
            break;
        case 2:
            errorMessage = "Location unavailable."
            break;
        case 3:
            errorMessage = "Request timeout."
            break;
    }
    alert("Oups! " + errorMessage)
}

autoLocatedCity()
// getPrayerTimesByCity()
// getPrayerTimesByLocationCoordinates() //! window.onload = getPrayerTimesByGeolocation()











const ExpectedResult =
{
    "code": 200,
    "status": "OK",
    "data": [
        {
            "timings": {
                "Fajr": "06:59 (+01)",
                "Sunrise": "08:25 (+01)",
                "Dhuhr": "13:41 (+01)",
                "Asr": "16:36 (+01)",
                "Sunset": "18:58 (+01)",
                "Maghrib": "18:58 (+01)",
                "Isha": "20:18 (+01)",
                "Imsak": "06:49 (+01)",
                "Midnight": "01:41 (+01)",
                "Firstthird": "23:27 (+01)",
                "Lastthird": "03:56 (+01)"
            },
            "date": {
                "readable": "01 Feb 2023",
                "timestamp": "1675238461",
                "gregorian": {
                    "date": "01-02-2023",
                    "format": "DD-MM-YYYY",
                    "day": "01",
                    "weekday": {
                        "en": "Wednesday"
                    },
                    "month": {
                        "number": 2,
                        "en": "February"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "10-07-1444",
                    "format": "DD-MM-YYYY",
                    "day": "10",
                    "weekday": {
                        "en": "Al Arba'a",
                        "ar": "الاربعاء"
                    },
                    "month": {
                        "number": 7,
                        "en": "Rajab",
                        "ar": "رَجَب"
                    },
                    "year": "1444",
                    "designation": {
                        "abbreviated": "AH",
                        "expanded": "Anno Hegirae"
                    },
                    "holidays": []
                }
            },
            "meta": {
                "latitude": 33.9715904,
                "longitude": -6.8498129,
                "timezone": "Africa/Casablanca",
                "method": {
                    "id": 3,
                    "name": "Muslim World League",
                    "params": {
                        "Fajr": 18,
                        "Isha": 17
                    },
                    "location": {
                        "latitude": 51.5194682,
                        "longitude": -0.1360365
                    }
                },
                "latitudeAdjustmentMethod": "ANGLE_BASED",
                "midnightMode": "STANDARD",
                "school": "STANDARD",
                "offset": {
                    "Imsak": 0,
                    "Fajr": 0,
                    "Sunrise": 0,
                    "Dhuhr": 0,
                    "Asr": 0,
                    "Maghrib": 0,
                    "Sunset": 0,
                    "Isha": 0,
                    "Midnight": 0
                }
            }
        },
        {
            "timings": {
                "Fajr": "06:58 (+01)",
                "Sunrise": "08:24 (+01)",
                "Dhuhr": "13:41 (+01)",
                "Asr": "16:37 (+01)",
                "Sunset": "18:59 (+01)",
                "Maghrib": "18:59 (+01)",
                "Isha": "20:19 (+01)",
                "Imsak": "06:48 (+01)",
                "Midnight": "01:41 (+01)",
                "Firstthird": "23:27 (+01)",
                "Lastthird": "03:55 (+01)"
            },
            "date": {
                "readable": "02 Feb 2023",
                "timestamp": "1675324861",
                "gregorian": {
                    "date": "02-02-2023",
                    "format": "DD-MM-YYYY",
                    "day": "02",
                    "weekday": {
                        "en": "Thursday"
                    },
                    "month": {
                        "number": 2,
                        "en": "February"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "11-07-1444",
                    "format": "DD-MM-YYYY",
                    "day": "11",
                    "weekday": {
                        "en": "Al Khamees",
                        "ar": "الخميس"
                    },
                    "month": {
                        "number": 7,
                        "en": "Rajab",
                        "ar": "رَجَب"
                    },
                    "year": "1444",
                    "designation": {
                        "abbreviated": "AH",
                        "expanded": "Anno Hegirae"
                    },
                    "holidays": []
                }
            },
            "meta": {
                "latitude": 33.9715904,
                "longitude": -6.8498129,
                "timezone": "Africa/Casablanca",
                "method": {
                    "id": 3,
                    "name": "Muslim World League",
                    "params": {
                        "Fajr": 18,
                        "Isha": 17
                    },
                    "location": {
                        "latitude": 51.5194682,
                        "longitude": -0.1360365
                    }
                },
                "latitudeAdjustmentMethod": "ANGLE_BASED",
                "midnightMode": "STANDARD",
                "school": "STANDARD",
                "offset": {
                    "Imsak": 0,
                    "Fajr": 0,
                    "Sunrise": 0,
                    "Dhuhr": 0,
                    "Asr": 0,
                    "Maghrib": 0,
                    "Sunset": 0,
                    "Isha": 0,
                    "Midnight": 0
                }
            }
        }
    ]
}
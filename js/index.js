// Import Axios Module
// const axios = require('axios') // Work with node.js but NOT with v. javascript in front-end

// Imported Functions
import { getPrayerTimesByCityResult, getPrayerTimesByAutolocationResult, getClientPosition } from "./apiRequests.js";


// Temp. data
let toDay = {
    day: "05",
    month: "02",
    year: "2023"
}
let choosenZone = {
    city: "Rabat",
    country: "Morocco",
    latitude: "33.9715904",
    longitude: "-6.8498129"
}

// Get prayer times By specifying a city
let getPrayerTimesByCity = async function () {
    try {
        console.log(await getPrayerTimesByCityResult(choosenZone, toDay))
    } catch (err) {
        alert("Oups, unexpected result! " + err)
    }
}

//  Get prayer times By auto locate the client's geographical position
let getPrayerTimesByGeolocation = async function () {
    try {
        console.log(await getPrayerTimesByAutolocationResult(toDay))
    } catch (err) {
        let errorMessage = "Undefined error."
        switch (err.code) {
            case 1:
                errorMessage = "Permission denied. Please allow the app to access your location in your browser settings."
                break;
            case 2:
                errorMessage = "Location unavailable."
                break;
            case 3:
                errorMessage = "Timeout."
                break;
        }
        alert("Oups! " + errorMessage)
    }
}

// getPrayerTimesByCity()
getPrayerTimesByGeolocation() //! window.onload = getPrayerTimesByGeolocation()















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



const menuBtn = document.querySelector(".menu-show-table")
const timesTableModal = document.querySelector(".times-table-modal")
const closeModal = document.querySelector(".times-table-modal__close-btn")

menuBtn.onclick = async ()=> {
    timesTableModal.classList.add("open")
    
}
closeModal.onclick = ()=> timesTableModal.classList.remove("open")

//this code inside menuBtn.onclick
//! get current month and put its name in the select list + fetch data according to it
const month = new Date().getMonth() + 1
fetchTableData(month)

async function fetchTableData(month) {
    //! distructure fetched data 
    // const {data} = timesByCoords
    const {data} = await axios("/times-table", params: {month})
    mapData(data)
}
function mapData(timesData) {
    timesData.map(renderPrayerTimesIntoTable)
    const renderPrayerTimesIntoTable = (day) => {
        const template = `
        <tr>
            <td>Sunday</td>
            <td>01</td>
            <td>4:50</td>
            <td>12:50</td>
            <td>4:30</td>
            <td>6:09</td>
            <td>7:24</td>
        </tr>
        <tr>
            <td>Sunday</td>
            <td>01</td>
            <td>4:50</td>
            <td>12:50</td>
            <td>4:30</td>
            <td>6:09</td>
            <td>7:24</td>
        </tr>
        `
    }
}

const day__temp = {
    "timings": {
        "Fajr": "05:02 (+01)",
        "Sunrise": "06:35 (+01)",
        "Dhuhr": "13:21 (+01)",
        "Asr": "17:04 (+01)",
        "Sunset": "20:08 (+01)",
        "Maghrib": "20:08 (+01)",
        "Isha": "21:35 (+01)",
        "Imsak": "04:52 (+01)",
        "Midnight": "01:21 (+01)",
        "Firstthird": "23:37 (+01)",
        "Lastthird": "03:06 (+01)"
    },
    "date": {
        "readable": "01 May 2023",
        "timestamp": "1682928061",
        "gregorian": {
            "date": "01-05-2023",
            "format": "DD-MM-YYYY",
            "day": "01",
            "weekday": {
                "en": "Monday"
            },
            "month": {
                "number": 5,
                "en": "May"
            },
            "year": "2023",
            "designation": {
                "abbreviated": "AD",
                "expanded": "Anno Domini"
            }
        },
        "hijri": {
            "date": "10-10-1444",
            "format": "DD-MM-YYYY",
            "day": "10",
            "weekday": {
                "en": "Al Athnayn",
                "ar": "الاثنين"
            },
            "month": {
                "number": 10,
                "en": "Shawwāl",
                "ar": "شَوّال"
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
        "latitude": 34.2591485,
        "longitude": -5.9221253,
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

timesByCoords = {
    "code": 200,
    "status": "OK",
    "data": [
        {
            "timings": {
                "Fajr": "05:02 (+01)",
                "Sunrise": "06:35 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:08 (+01)",
                "Maghrib": "20:08 (+01)",
                "Isha": "21:35 (+01)",
                "Imsak": "04:52 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:37 (+01)",
                "Lastthird": "03:06 (+01)"
            },
            "date": {
                "readable": "01 May 2023",
                "timestamp": "1682928061",
                "gregorian": {
                    "date": "01-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "01",
                    "weekday": {
                        "en": "Monday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "10-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "10",
                    "weekday": {
                        "en": "Al Athnayn",
                        "ar": "الاثنين"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "05:01 (+01)",
                "Sunrise": "06:33 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:08 (+01)",
                "Maghrib": "20:08 (+01)",
                "Isha": "21:36 (+01)",
                "Imsak": "04:51 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:37 (+01)",
                "Lastthird": "03:05 (+01)"
            },
            "date": {
                "readable": "02 May 2023",
                "timestamp": "1683014461",
                "gregorian": {
                    "date": "02-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "02",
                    "weekday": {
                        "en": "Tuesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "11-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "11",
                    "weekday": {
                        "en": "Al Thalaata",
                        "ar": "الثلاثاء"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:59 (+01)",
                "Sunrise": "06:32 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:09 (+01)",
                "Maghrib": "20:09 (+01)",
                "Isha": "21:37 (+01)",
                "Imsak": "04:49 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:37 (+01)",
                "Lastthird": "03:05 (+01)"
            },
            "date": {
                "readable": "03 May 2023",
                "timestamp": "1683100861",
                "gregorian": {
                    "date": "03-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "03",
                    "weekday": {
                        "en": "Wednesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "12-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "12",
                    "weekday": {
                        "en": "Al Arba'a",
                        "ar": "الاربعاء"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:58 (+01)",
                "Sunrise": "06:31 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:10 (+01)",
                "Maghrib": "20:10 (+01)",
                "Isha": "21:38 (+01)",
                "Imsak": "04:48 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:37 (+01)",
                "Lastthird": "03:04 (+01)"
            },
            "date": {
                "readable": "04 May 2023",
                "timestamp": "1683187261",
                "gregorian": {
                    "date": "04-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "04",
                    "weekday": {
                        "en": "Thursday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "13-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "13",
                    "weekday": {
                        "en": "Al Khamees",
                        "ar": "الخميس"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:57 (+01)",
                "Sunrise": "06:31 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:11 (+01)",
                "Maghrib": "20:11 (+01)",
                "Isha": "21:39 (+01)",
                "Imsak": "04:47 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:37 (+01)",
                "Lastthird": "03:04 (+01)"
            },
            "date": {
                "readable": "05 May 2023",
                "timestamp": "1683273661",
                "gregorian": {
                    "date": "05-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "05",
                    "weekday": {
                        "en": "Friday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "14-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "14",
                    "weekday": {
                        "en": "Al Juma'a",
                        "ar": "الجمعة"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:55 (+01)",
                "Sunrise": "06:30 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:12 (+01)",
                "Maghrib": "20:12 (+01)",
                "Isha": "21:40 (+01)",
                "Imsak": "04:45 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:38 (+01)",
                "Lastthird": "03:04 (+01)"
            },
            "date": {
                "readable": "06 May 2023",
                "timestamp": "1683360061",
                "gregorian": {
                    "date": "06-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "06",
                    "weekday": {
                        "en": "Saturday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "15-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "15",
                    "weekday": {
                        "en": "Al Sabt",
                        "ar": "السبت"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:54 (+01)",
                "Sunrise": "06:29 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:12 (+01)",
                "Maghrib": "20:12 (+01)",
                "Isha": "21:41 (+01)",
                "Imsak": "04:44 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:38 (+01)",
                "Lastthird": "03:03 (+01)"
            },
            "date": {
                "readable": "07 May 2023",
                "timestamp": "1683446461",
                "gregorian": {
                    "date": "07-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "07",
                    "weekday": {
                        "en": "Sunday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "16-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "16",
                    "weekday": {
                        "en": "Al Ahad",
                        "ar": "الاحد"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:53 (+01)",
                "Sunrise": "06:28 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:13 (+01)",
                "Maghrib": "20:13 (+01)",
                "Isha": "21:42 (+01)",
                "Imsak": "04:43 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:38 (+01)",
                "Lastthird": "03:03 (+01)"
            },
            "date": {
                "readable": "08 May 2023",
                "timestamp": "1683532861",
                "gregorian": {
                    "date": "08-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "08",
                    "weekday": {
                        "en": "Monday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "17-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "17",
                    "weekday": {
                        "en": "Al Athnayn",
                        "ar": "الاثنين"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:52 (+01)",
                "Sunrise": "06:27 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:14 (+01)",
                "Maghrib": "20:14 (+01)",
                "Isha": "21:43 (+01)",
                "Imsak": "04:42 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:38 (+01)",
                "Lastthird": "03:03 (+01)"
            },
            "date": {
                "readable": "09 May 2023",
                "timestamp": "1683619261",
                "gregorian": {
                    "date": "09-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "09",
                    "weekday": {
                        "en": "Tuesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "18-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "18",
                    "weekday": {
                        "en": "Al Thalaata",
                        "ar": "الثلاثاء"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:50 (+01)",
                "Sunrise": "06:26 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:15 (+01)",
                "Maghrib": "20:15 (+01)",
                "Isha": "21:44 (+01)",
                "Imsak": "04:40 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:38 (+01)",
                "Lastthird": "03:02 (+01)"
            },
            "date": {
                "readable": "10 May 2023",
                "timestamp": "1683705661",
                "gregorian": {
                    "date": "10-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "10",
                    "weekday": {
                        "en": "Wednesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "19-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "19",
                    "weekday": {
                        "en": "Al Arba'a",
                        "ar": "الاربعاء"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:49 (+01)",
                "Sunrise": "06:25 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:04 (+01)",
                "Sunset": "20:15 (+01)",
                "Maghrib": "20:15 (+01)",
                "Isha": "21:45 (+01)",
                "Imsak": "04:39 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:39 (+01)",
                "Lastthird": "03:02 (+01)"
            },
            "date": {
                "readable": "11 May 2023",
                "timestamp": "1683792061",
                "gregorian": {
                    "date": "11-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "11",
                    "weekday": {
                        "en": "Thursday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "20-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "20",
                    "weekday": {
                        "en": "Al Khamees",
                        "ar": "الخميس"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:48 (+01)",
                "Sunrise": "06:24 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:16 (+01)",
                "Maghrib": "20:16 (+01)",
                "Isha": "21:47 (+01)",
                "Imsak": "04:38 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:39 (+01)",
                "Lastthird": "03:02 (+01)"
            },
            "date": {
                "readable": "12 May 2023",
                "timestamp": "1683878461",
                "gregorian": {
                    "date": "12-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "12",
                    "weekday": {
                        "en": "Friday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "21-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "21",
                    "weekday": {
                        "en": "Al Juma'a",
                        "ar": "الجمعة"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:47 (+01)",
                "Sunrise": "06:24 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:17 (+01)",
                "Maghrib": "20:17 (+01)",
                "Isha": "21:48 (+01)",
                "Imsak": "04:37 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:39 (+01)",
                "Lastthird": "03:01 (+01)"
            },
            "date": {
                "readable": "13 May 2023",
                "timestamp": "1683964861",
                "gregorian": {
                    "date": "13-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "13",
                    "weekday": {
                        "en": "Saturday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "22-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "22",
                    "weekday": {
                        "en": "Al Sabt",
                        "ar": "السبت"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:46 (+01)",
                "Sunrise": "06:23 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:18 (+01)",
                "Maghrib": "20:18 (+01)",
                "Isha": "21:49 (+01)",
                "Imsak": "04:36 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:39 (+01)",
                "Lastthird": "03:01 (+01)"
            },
            "date": {
                "readable": "14 May 2023",
                "timestamp": "1684051261",
                "gregorian": {
                    "date": "14-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "14",
                    "weekday": {
                        "en": "Sunday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "23-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "23",
                    "weekday": {
                        "en": "Al Ahad",
                        "ar": "الاحد"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:45 (+01)",
                "Sunrise": "06:22 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:18 (+01)",
                "Maghrib": "20:18 (+01)",
                "Isha": "21:50 (+01)",
                "Imsak": "04:35 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:40 (+01)",
                "Lastthird": "03:01 (+01)"
            },
            "date": {
                "readable": "15 May 2023",
                "timestamp": "1684137661",
                "gregorian": {
                    "date": "15-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "15",
                    "weekday": {
                        "en": "Monday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "24-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "24",
                    "weekday": {
                        "en": "Al Athnayn",
                        "ar": "الاثنين"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:44 (+01)",
                "Sunrise": "06:21 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:19 (+01)",
                "Maghrib": "20:19 (+01)",
                "Isha": "21:51 (+01)",
                "Imsak": "04:34 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:40 (+01)",
                "Lastthird": "03:01 (+01)"
            },
            "date": {
                "readable": "16 May 2023",
                "timestamp": "1684224061",
                "gregorian": {
                    "date": "16-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "16",
                    "weekday": {
                        "en": "Tuesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "25-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "25",
                    "weekday": {
                        "en": "Al Thalaata",
                        "ar": "الثلاثاء"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:43 (+01)",
                "Sunrise": "06:21 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:20 (+01)",
                "Maghrib": "20:20 (+01)",
                "Isha": "21:52 (+01)",
                "Imsak": "04:33 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:40 (+01)",
                "Lastthird": "03:00 (+01)"
            },
            "date": {
                "readable": "17 May 2023",
                "timestamp": "1684310461",
                "gregorian": {
                    "date": "17-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "17",
                    "weekday": {
                        "en": "Wednesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "26-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "26",
                    "weekday": {
                        "en": "Al Arba'a",
                        "ar": "الاربعاء"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:42 (+01)",
                "Sunrise": "06:20 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:21 (+01)",
                "Maghrib": "20:21 (+01)",
                "Isha": "21:53 (+01)",
                "Imsak": "04:32 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:40 (+01)",
                "Lastthird": "03:00 (+01)"
            },
            "date": {
                "readable": "18 May 2023",
                "timestamp": "1684396861",
                "gregorian": {
                    "date": "18-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "18",
                    "weekday": {
                        "en": "Thursday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "27-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "27",
                    "weekday": {
                        "en": "Al Khamees",
                        "ar": "الخميس"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:41 (+01)",
                "Sunrise": "06:19 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:21 (+01)",
                "Maghrib": "20:21 (+01)",
                "Isha": "21:54 (+01)",
                "Imsak": "04:31 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:41 (+01)",
                "Lastthird": "03:00 (+01)"
            },
            "date": {
                "readable": "19 May 2023",
                "timestamp": "1684483261",
                "gregorian": {
                    "date": "19-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "19",
                    "weekday": {
                        "en": "Friday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "28-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "28",
                    "weekday": {
                        "en": "Al Juma'a",
                        "ar": "الجمعة"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:40 (+01)",
                "Sunrise": "06:19 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:22 (+01)",
                "Maghrib": "20:22 (+01)",
                "Isha": "21:55 (+01)",
                "Imsak": "04:30 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:41 (+01)",
                "Lastthird": "03:00 (+01)"
            },
            "date": {
                "readable": "20 May 2023",
                "timestamp": "1684569661",
                "gregorian": {
                    "date": "20-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "20",
                    "weekday": {
                        "en": "Saturday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "29-10-1444",
                    "format": "DD-MM-YYYY",
                    "day": "29",
                    "weekday": {
                        "en": "Al Sabt",
                        "ar": "السبت"
                    },
                    "month": {
                        "number": 10,
                        "en": "Shawwāl",
                        "ar": "شَوّال"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:39 (+01)",
                "Sunrise": "06:18 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:05 (+01)",
                "Sunset": "20:23 (+01)",
                "Maghrib": "20:23 (+01)",
                "Isha": "21:56 (+01)",
                "Imsak": "04:29 (+01)",
                "Midnight": "01:20 (+01)",
                "Firstthird": "23:41 (+01)",
                "Lastthird": "03:00 (+01)"
            },
            "date": {
                "readable": "21 May 2023",
                "timestamp": "1684656061",
                "gregorian": {
                    "date": "21-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "21",
                    "weekday": {
                        "en": "Sunday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "01-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "01",
                    "weekday": {
                        "en": "Al Ahad",
                        "ar": "الاحد"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:38 (+01)",
                "Sunrise": "06:17 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:24 (+01)",
                "Maghrib": "20:24 (+01)",
                "Isha": "21:57 (+01)",
                "Imsak": "04:28 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:42 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "22 May 2023",
                "timestamp": "1684742461",
                "gregorian": {
                    "date": "22-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "22",
                    "weekday": {
                        "en": "Monday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "02-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "02",
                    "weekday": {
                        "en": "Al Athnayn",
                        "ar": "الاثنين"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:37 (+01)",
                "Sunrise": "06:17 (+01)",
                "Dhuhr": "13:20 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:24 (+01)",
                "Maghrib": "20:24 (+01)",
                "Isha": "21:58 (+01)",
                "Imsak": "04:27 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:42 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "23 May 2023",
                "timestamp": "1684828861",
                "gregorian": {
                    "date": "23-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "23",
                    "weekday": {
                        "en": "Tuesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "03-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "03",
                    "weekday": {
                        "en": "Al Thalaata",
                        "ar": "الثلاثاء"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:36 (+01)",
                "Sunrise": "06:16 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:25 (+01)",
                "Maghrib": "20:25 (+01)",
                "Isha": "21:59 (+01)",
                "Imsak": "04:26 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:42 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "24 May 2023",
                "timestamp": "1684915261",
                "gregorian": {
                    "date": "24-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "24",
                    "weekday": {
                        "en": "Wednesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "04-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "04",
                    "weekday": {
                        "en": "Al Arba'a",
                        "ar": "الاربعاء"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:35 (+01)",
                "Sunrise": "06:16 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:26 (+01)",
                "Maghrib": "20:26 (+01)",
                "Isha": "22:00 (+01)",
                "Imsak": "04:25 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:42 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "25 May 2023",
                "timestamp": "1685001661",
                "gregorian": {
                    "date": "25-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "25",
                    "weekday": {
                        "en": "Thursday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "05-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "05",
                    "weekday": {
                        "en": "Al Khamees",
                        "ar": "الخميس"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:34 (+01)",
                "Sunrise": "06:15 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:26 (+01)",
                "Maghrib": "20:26 (+01)",
                "Isha": "22:01 (+01)",
                "Imsak": "04:24 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:43 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "26 May 2023",
                "timestamp": "1685088061",
                "gregorian": {
                    "date": "26-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "26",
                    "weekday": {
                        "en": "Friday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "06-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "06",
                    "weekday": {
                        "en": "Al Juma'a",
                        "ar": "الجمعة"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:34 (+01)",
                "Sunrise": "06:15 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:27 (+01)",
                "Maghrib": "20:27 (+01)",
                "Isha": "22:02 (+01)",
                "Imsak": "04:24 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:43 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "27 May 2023",
                "timestamp": "1685174461",
                "gregorian": {
                    "date": "27-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "27",
                    "weekday": {
                        "en": "Saturday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "07-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "07",
                    "weekday": {
                        "en": "Al Sabt",
                        "ar": "السبت"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:33 (+01)",
                "Sunrise": "06:14 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:28 (+01)",
                "Maghrib": "20:28 (+01)",
                "Isha": "22:03 (+01)",
                "Imsak": "04:23 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:43 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "28 May 2023",
                "timestamp": "1685260861",
                "gregorian": {
                    "date": "28-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "28",
                    "weekday": {
                        "en": "Sunday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "08-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "08",
                    "weekday": {
                        "en": "Al Ahad",
                        "ar": "الاحد"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:32 (+01)",
                "Sunrise": "06:14 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:06 (+01)",
                "Sunset": "20:28 (+01)",
                "Maghrib": "20:28 (+01)",
                "Isha": "22:04 (+01)",
                "Imsak": "04:22 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:44 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "29 May 2023",
                "timestamp": "1685347261",
                "gregorian": {
                    "date": "29-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "29",
                    "weekday": {
                        "en": "Monday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "09-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "09",
                    "weekday": {
                        "en": "Al Athnayn",
                        "ar": "الاثنين"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:32 (+01)",
                "Sunrise": "06:14 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:07 (+01)",
                "Sunset": "20:29 (+01)",
                "Maghrib": "20:29 (+01)",
                "Isha": "22:05 (+01)",
                "Imsak": "04:22 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:44 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "30 May 2023",
                "timestamp": "1685433661",
                "gregorian": {
                    "date": "30-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "30",
                    "weekday": {
                        "en": "Tuesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "10-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "10",
                    "weekday": {
                        "en": "Al Thalaata",
                        "ar": "الثلاثاء"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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
                "Fajr": "04:31 (+01)",
                "Sunrise": "06:13 (+01)",
                "Dhuhr": "13:21 (+01)",
                "Asr": "17:07 (+01)",
                "Sunset": "20:30 (+01)",
                "Maghrib": "20:30 (+01)",
                "Isha": "22:05 (+01)",
                "Imsak": "04:21 (+01)",
                "Midnight": "01:21 (+01)",
                "Firstthird": "23:44 (+01)",
                "Lastthird": "02:59 (+01)"
            },
            "date": {
                "readable": "31 May 2023",
                "timestamp": "1685520061",
                "gregorian": {
                    "date": "31-05-2023",
                    "format": "DD-MM-YYYY",
                    "day": "31",
                    "weekday": {
                        "en": "Wednesday"
                    },
                    "month": {
                        "number": 5,
                        "en": "May"
                    },
                    "year": "2023",
                    "designation": {
                        "abbreviated": "AD",
                        "expanded": "Anno Domini"
                    }
                },
                "hijri": {
                    "date": "11-11-1444",
                    "format": "DD-MM-YYYY",
                    "day": "11",
                    "weekday": {
                        "en": "Al Arba'a",
                        "ar": "الاربعاء"
                    },
                    "month": {
                        "number": 11,
                        "en": "Dhū al-Qaʿdah",
                        "ar": "ذوالقعدة"
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
                "latitude": 34.2591485,
                "longitude": -5.9221253,
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

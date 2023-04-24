const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(express.static("frontEndStatic"))

// Allow CORS for all routes
//* app.use(cors())
const allowedOrigins = ['https://maps.googleapis.com', 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


// Render Root file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Set the API key
const googleMapApiKey = process.env.G_API_KEY


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Get Adresse from Coordinates
app.get('/reverse-geocode', async (req, res) => {
    const { lat, lng } = req.query; // must have the same name as the passed parameters
    try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
        const { data } = await axios.get(url);
        const localAdresse = {
            cityName: data.city ? data.city : data.locality ? data.locality : "Unknown area",
            countryName: data.countryName,
            countryShortName: data.countryCode
        }
        res.json(localAdresse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Islamic Date
app.get('/islamic-date', async (req, res) => {
    try {
        const { gregorian } = req.query;
        const url = `https://api.aladhan.com/v1/gToH?date=${gregorian}`
        const { data: { data: { hijri: { month, day, year } } } } = await axios.get(url);
        const islamicDate = `${month.en} ${day}, ${year}`
        res.json(islamicDate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Nearby Mosques List
app.get('/places', async (req, res) => {
    try {
        const current_lat = req.query.lat
        const current_lng = req.query.lng // must have the same name as the passed parameters
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${current_lat},${current_lng}&type=mosque&rankby=distance&key=${googleMapApiKey}`;
        const { data: { results } } = await axios.get(url);
        const mosques = []
        const markers = []

        for (let i = 0; i < results.length; i++) {
            if (i === 6) break
            const { geometry: { location: { lat, lng } }, name } = results[i]
            const distance = haversineCalcDistance([current_lat, current_lng], [lat, lng])
            const mosqueInfo = {
                mosque_name: name,
                mosque_Lat: lat,
                mosque_Lng: lng,
                mosque_dist: distance
            }

            mosques.push(mosqueInfo)
            markers.push({ lat, lng })
        }

        console.log("mosques List: ", mosques) //!
        console.log("mosques Markers: ", markers) //!
        // res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ mosques, markers })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Calculate the distance between two positions using "Heversine Formula"
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
}
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

// Define API endpoint
app.get('/places', async (req, res) => {
    const { lat, lng } = req.query; // must have the same name as the passed parameters
    try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=mosque&rankby=distance&key=${googleMapApiKey}`;
        const response = await axios.get(url);
        console.log(response.data) //!
        // res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(response.data);
        //! The usage of res.json(response.data): This line of code is sending the entire response.data as the response body to the client. Depending on the data returned by the Google Maps API, this may expose sensitive information to the client. It's recommended to sanitize the data and only send the necessary information to the client.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

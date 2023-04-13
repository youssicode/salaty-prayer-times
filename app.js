const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(express.static("frontEndStatic"))

// Allow CORS for all routes
app.use(cors())

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

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(response.data);
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

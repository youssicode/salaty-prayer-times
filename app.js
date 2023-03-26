const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.static("frontEndStatic"))

// Allow CORS for all routes
app.use(cors());

// Render Root file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontEndStatic/index.html")
})


// Define API endpoint
app.get('/places', async (req, res) => {
    const { lat, lng, type, apiKey } = req.query;

    try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${type}&key=${apiKey}`;
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

// =================


// const API_KEY = 'AIzaSyAhf7kC_ayFc99YrKDhJLl_xlzeuOBFfxI';

// app.use(express.json());

// app.get('/places', async (req, res) => {
//   const { lat, lng, type } = req.query;

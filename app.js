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

// Set the API key
const googleMapApiKey = 'AIzaSyBmpG54I9-eYib9_21wPdmEkV7ylrjN2KA'
// You can set an environment variable using the following command(Terminal):
//? heroku config:set G_API_KEY='AIzaSyBmpG54I9-eYib9_21wPdmEkV7ylrjN2KA'
// This will set an environment variable named API_KEY to the value of your API key.
// In your server-side script, you can access the value of the API_KEY environment variable using the process.env object:
//? const googleMapApiKey = process.env.G_API_KEY;

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
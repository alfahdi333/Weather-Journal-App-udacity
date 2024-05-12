const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const port = 8000;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

// Start up an instance of app
const app = express();


/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
    console.log(`Running at port http://localhost:${port}`);
});

// Routes
app.get('/zipData', (req, res) => {
    res.send(projectData);
});

// POST route to update project data
app.post('/getData', (req, res) => {
    projectData = req.body;

    // To indicate successful data update
    res.status(200).send(projectData);
});

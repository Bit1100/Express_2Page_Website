// Importing the Modules
require("dotenv").config(); // process.env
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const router = require('./routes/index');
require('./models/db/conn');

// Initializing Express App
const app = express();

// Middleware to recognize incoming data as JSON object
app.use(express.json());

// Setting the PORT
const port = process.env.PORT || 3000;

// Using in-built middleware
app.use("/static", express.static(path.join(__dirname, 'public')));

// View Engine Set-Up
app.set('views', path.join(__dirname, 'templates', 'views'));
app.set('view engine', 'hbs');

// Register the partials
hbs.registerPartials(path.join(__dirname, 'templates', 'partials'));

// Using the router from the separate file => User-defined Middleware
app.use('/', router);

// Listening Request at the port
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running at PORT ${port}`);
});

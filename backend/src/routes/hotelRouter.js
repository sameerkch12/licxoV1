const express = require("express");
const { createHotel, getAllHotels, getOneHotel, findNearestHotels,  filterHotels } = require("../controllers/hotelController");
const upload = require("../middlewares/multer");

const hotelRoute = express.Router();


// Create a new hotel with image uploads
hotelRoute.post('/create', upload.array('images', 5), createHotel);  // ${API_URL}/api/v1/hotels/create

// Endpoint to save location data
// hotelRoute.post('/get-location', getLocation);  // ${API_URL}/api/v1/hotels/get-location

// Retrieve all hotels
hotelRoute.get('/hotels', getAllHotels);  // ${API_URL}/api/v1/hotels/hotels

// Find nearest hotels based on location
hotelRoute.get('/filter', filterHotels);  // ${API_URL}/api/v1/hotels/filter

// Retrieve one hotel by phone
hotelRoute.get('/:phone', getOneHotel);  // ${API_URL}/api/v1/hotels/:phone


hotelRoute.get('/:id', getOneHotel);  // ${API_URL}/api/v1/hotels/:phone


// Find nearest hotels based on location
hotelRoute.post('/find-nearest', findNearestHotels);  // ${API_URL}/api/v1/hotels/find-nearest


module.exports = hotelRoute;

const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/citiesController');

// Şehirleri çekme
router.get("/", citiesController.getAllCities);

module.exports = router;
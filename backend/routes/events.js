const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// Etkinliklerle ilgili CRUD işlemleri
router.get("/", eventsController.getAllEvents);
router.get("/id/:id", eventsController.getEventById);
router.get("/category/:category", eventsController.getEventByCategory);

module.exports = router;

const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// Etkinliklerle ilgili CRUD işlemleri
router.get("/", eventsController.getAllEvents);
router.get("/id/:id", eventsController.getEventById);
router.post("/addEvent", eventsController.addEvent);
router.get("/category/:category", eventsController.getEventByCategory);
router.delete("/delete/:id", eventsController.deleteEvent);

module.exports = router;

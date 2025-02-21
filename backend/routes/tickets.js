const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');


router.get("/:userId", ticketsController.getUserTickets);
router.post("/buy", ticketsController.buyTicket);


module.exports = router;
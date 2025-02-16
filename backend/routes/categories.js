const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Kategorileri çekme
router.get("/", categoriesController.getAllCategories);

module.exports = router;

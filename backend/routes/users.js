const express = require('express');
const { registerUser, loginUser, changePassword, deleteUser } = require('../controllers/usersControllers');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', changePassword);
router.delete('/:email', deleteUser);


module.exports = router;

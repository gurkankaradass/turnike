const express = require('express');
const { registerUser, loginUser, changePassword, deleteUser, loginAdmin } = require('../controllers/usersControllers');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/loginAdmin', loginAdmin);
router.post('/change-password', changePassword);
router.delete('/:email', deleteUser);


module.exports = router;

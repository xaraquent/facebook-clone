const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Hämta alla konton
router.get('/users', usersController.getUsers);

// Hämta ett konto
router.get('/user', usersController.getUser);

// Skapar konto
router.post('/createUser', usersController.createUser);

// Ta bort konto
router.delete('/deleteUser', usersController.deleteUser);

// Uppdatera sit konto
router.put('/update', usersController.updateUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Hämta alla konton
router.get('/users', usersController.getUsers);

// Hämta ett konto
router.get('/users/:user_ID', usersController.getUser);

// Skapar konto
router.post('/users', usersController.createUser);

// Ta bort konto
router.delete('/users/:user_ID', usersController.deleteUser);

// Uppdatera sit konto
router.put('/users', usersController.updateUser);

//Route för att kunna logga in
router.post('/login', usersController.loginUser);

module.exports = router;

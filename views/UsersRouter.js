const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

const UsersController = require('../controllers/UsersController');


//Endpoint-function links
router.get('/', auth, UsersController.getUsers);
router.post('/register', UsersController.postUser);
router.post('/login', UsersController.loginUser);
/* router.get("/profileuser",auth, UsersController.getProfile) */


//Export
module.exports = router;
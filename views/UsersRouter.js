const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

const UsersController = require('../controllers/UsersController');


//Endpoint-function links
router.get('/', auth, UsersController.getUsers);
router.post('/adduser', UsersController.postUser);
router.post('/login', UsersController.loginUser);


//Export
module.exports = router;
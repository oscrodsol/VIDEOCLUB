const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const UsersController = require('../controllers/UsersController');


//Endpoint-function links
router.get('/', auth, UsersController.getUsers);
router.post('/register', UsersController.postUser);
router.post('/login', UsersController.loginUser);
router.put('/modify', isAdmin, auth, UsersController.modifyUser);
router.get('/search/:id', UsersController.getUserById);
/* router.get("/profileuser",auth, UsersController.getProfile) */


//Export
module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const RentsController = require('../controllers/RentsController');


//Endpoint-function links
router.get('/', isAdmin, auth, RentsController.getRents);
router.post('/addrent', auth, RentsController.postRent);


//Export
module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

const RentsController = require('../controllers/RentsController');


//Endpoint-function links
router.get('/', auth, RentsController.getRents);
router.post('/addrent', auth, RentsController.postRent);


//Export
module.exports = router;
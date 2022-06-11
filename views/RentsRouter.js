const express = require('express');
const router = express.Router();

const RentsController = require('../controllers/RentsController');


//Endpoint-function links
router.get('/', auth, RentsController.getRents);
router.post('/addrent', RentsController.postrent);


//Export
module.exports = router;
const express = require('express');
const router = express.Router();

const FilmsController = require('../controllers/FilmsController');


//Endpoint-function links
router.get('/', FilmsController.getFilms);
router.post('/addfilm', FilmsController.postFilm);


//Export
module.exports = router;
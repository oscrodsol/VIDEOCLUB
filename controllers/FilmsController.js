const { Film } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

//UserController object declaration
const FilmsController = {};

FilmsController.getFilms = (req, res) => {
    //Esta funcion llamada findAll es una funcion de Sequelize
    Film.findAll()
        .then(data => {

            res.send(data)
        });
};

FilmsController.postFilm = async (req, res) => {

    let title = req.body.title;
    let duration = req.body.duration;
    let price = req.body.price;
    let release_date = req.body.release_date;
    Film.create({
        
        title: title,
        duration: duration,
        price: price,
        release_date: release_date

    }).then(film => {
        res.send(`You have added ${film.title} succesfully to the list of films`);

    }).catch((error) => {
        res.send(error);
    });

};

//Export
module.exports = FilmsController;
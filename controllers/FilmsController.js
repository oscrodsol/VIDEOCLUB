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
    let type = req.body.type;
    let genre = req.body.genre;
    let rating = req.body.rating;

    Film.create({
        
        title: title,
        duration: duration,
        price: price,
        release_date: release_date,
        type: type,
        genre: genre,
        rating: rating

    }).then(film => {
        res.send(`You have added ${film.title} succesfully to the list of films`);

    }).catch((error) => {
        res.send(error);
    });

};

FilmsController.searchFilm = async (req, res) => {

    let search = req.params.search;

    let consulta = `SELECT films.title AS TitleFilms FROM films WHERE title LIKE "${search}";`;

    let resultado = await Film.sequelize.query(consulta, {
        type: Film.sequelize.QueryTypes.SELECT
    });

    if(resultado != 0){
        res.send(resultado);
    }else {
        res.send("Tu búsqueda es estúpida y no trae nada");
    };
}

//Export
module.exports = FilmsController;
const { Film } = require('../models/index');

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

    let consulta = `SELECT films.title AS TitleFilm, 
    films.duration AS duration, 
    films.price AS price, 
    films.release_date AS release_date, 
    films.type AS type, 
    films.genre AS genre, 
    films.rating AS rating 
    FROM films WHERE title LIKE "${search}";`;

    let resultado = await Film.sequelize.query(consulta, {
        type: Film.sequelize.QueryTypes.SELECT
    });

    if(resultado != 0){
        res.send(resultado);
    }else {
        res.send(`We can't found the film ${search}`);
    };
}

//Export
module.exports = FilmsController;
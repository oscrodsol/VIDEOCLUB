const { Rent } = require('../models/index');

//UserController object declaration
const RentsController = {};

RentsController.getRents = async (req, res) => {

    let consulta = `SELECT users.name AS UserName, 
        rents.id AS RentId,
        films.title AS TitleFilm, 
        films.price AS RentPrice, 
        rents.payment AS Payment,
        rents.createdAt AS RentedAt

        FROM users 
        INNER JOIN rents ON users.id = rents.userId
        INNER JOIN films ON films.id = rents.filmId;`;


    let resultado = await Rent.sequelize.query(consulta, {
        type: Rent.sequelize.QueryTypes.SELECT
    });

    if (resultado != 0) {
        res.send(resultado);
    } else {
        res.send("We cant find any rent");
    };

};


RentsController.postRent = async (req, res) => {

    let userId = req.body.userId;
    let filmId = req.body.filmId;
    let payment = req.body.payment;

    if (userId === null || userId == "" || userId == undefined) {

        res.send("You need to include the user id to continue");

    } else if (filmId === null || filmId == "" || filmId == undefined) {

        res.send("You need to include the film id to continue");

    } else {
        Rent.create({
            userId: userId,
            filmId: filmId,
            payment: payment
        }).then(rent => {
            res.send(`Rent created succesfully`);

        }).catch((error) => {
            res.send(error);
        });
    }

};

//Export
module.exports = RentsController;
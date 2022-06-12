const { Rent } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

//UserController object declaration
const RentsController = {};

RentsController.getRents = (req, res) => {
    //Esta funcion llamada findAll es una funcion de Sequelize
    Rent.findAll()
    .then(data => {
    
        res.send(data)
    });
};

RentsController.postRent = async (req, res) => {

    let userId = req.body.userId;
    let filmId = req.body.filmId;
    let payment = req.body.payment;

    if(userId === null || userId == "" || userId == undefined){

        res.send("You need to include the user id to continue");

    }else if(filmId === null || filmId == "" || filmId == undefined){

        res.send("You need to include the film id to continue");
        
    }else{
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
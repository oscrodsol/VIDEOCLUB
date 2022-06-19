const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

//UserController object declaration
const UsersController = {};

UsersController.getUsers = (req, res) => {
    //Esta funcion llamada findAll es una funcion de Sequelize

    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(data => {

            res.send(data)
        });

};

UsersController.postUser = async (req, res) => {

    let name = req.body.name;
    let age = req.body.age;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    User.create({
        name: name,
        age: age,
        email: email,
        password: password,

    }).then(user => {
        res.send(`${user.name}, you have been added succesfully`);

    }).catch((error) => {
        res.send(error);
    });


};

UsersController.loginUser = (req, res) => {

    let credentials = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: { email: credentials }

    }).then(selectedUser => {

        if (!selectedUser) {
            res.send("Incorrect User or Password");
        } else {
            if (bcrypt.compareSync(password, selectedUser.password)) {
                //Ahora ya si hemos comprobado que el usuario existe (email es correcto) y el password SI corresponde a ese usuario

                let token = jwt.sign({ user: selectedUser }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                console.log(token);

                let loginMessage = `Welcome again ${selectedUser.name}`
                res.json({
                    loginMessage,
                    user: {
                        id: selectedUser.id,
                        name: selectedUser.name
                    },
                    token: token
                })
            };
        };

    }).catch(err => console.log(err));
};

/* UsersController.getProfile = (req, res) => {

    User.findAll()
    .then(data => {
    
        res.send(data)
    });

}; */

//Export
module.exports = UsersController;
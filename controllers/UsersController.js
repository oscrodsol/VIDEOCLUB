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

UsersController.modifyUser= async(req,res)=>{
   
    let name = req.body.name;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    let age = req.body.age;
    let rol = req.body.rol;
    let id = req.body.id;

    await User.update({
        name: name,
        password: password,
        email: email,
        age: age,
        rol: rol
    },
    {
        where:{
            id:id
        }
    }).then(
        res.send(`The info on the user ${name} has been modified`)
    ).catch(err => console.log(err));
};

UsersController.getUserById = async (req, res) => {
    
    let id = req.params.id;

    let consulta = `SELECT * FROM users WHERE id LIKE ${id};`;

    let resultado = await User.sequelize.query(consulta, {
        type: User.sequelize.QueryTypes.SELECT
    });

    if(resultado != 0){
        res.send(resultado);
    }else {
        res.send("We can't found the user");
    };

};

//Export
module.exports = UsersController;
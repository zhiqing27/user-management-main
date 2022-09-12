'use strict'

//import all controller here
const AdminController = require('../app/controllers/AdminController');
const UserController = require('../app/controllers/UserController');
module.exports = function (app) {
    app.post("/create", AdminController.createrUser);
    app.post("/login", AdminController.login);
    app.post("/register", UserController.createrUser);
    app.post("/update", UserController.updateUser);
    app.post("/delete", UserController.deleteUser);
    app.get("/users", UserController.getUser);
};
const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

// es post porque vamos a enviar datos del cliente al servidor,esta ruta se va ejecutar en /auth/register,y cuando se haga un post a esta ruta se ejecutara authcontroler.register

api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);

module.exports = api;

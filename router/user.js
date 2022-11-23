const express = require("express");
const multiparty = require("connect-multiparty"); // que nos permite subir ficheros con node a través de http, y se guarde en el servidor

const md_upload = multiparty({ uploadDir: "./uploads/avatar" }); //aca es donde se va a subir, es la carpeta donde se va a subir el archivo
const UserController = require("../controllers/user"); // aca se va a llamar user Controller en auth en auth controller
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser); // como vamos a enviar datos por el body le pongo post, le agrego otro midleware para poder subir las fotografias
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.updateUser
);
api.delete("/user/:id", [md_auth.asureAuth], UserController.deleteUser);
// podriamos poner put pero el patch solo actualiza los que se agregaron es como el put pero se llama patch, es una actuzalizacion parcial
module.exports = api;

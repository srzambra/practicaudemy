//EXPRESS Proporciona mecanismos para: Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas)

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // es un paquete de node para poder usar el http
const { API_VERSION } = require("./constants");

const app = express();

//IMPORT ROUTING
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");

//CONFIGURACION DE BODY PARSE PARA PODER MANDAR CONTENIDO EN EL BODY

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // con esto ta tenemos configurado nuestro bodyparse en el servidor

//CONFIGURACION DE STATIC FOLDER(DONDE VAN TODAS LAS FOTOS)

app.use(express.static("uploads")); // le digo que la carpeta que va a ser static es upload

//CONFIGURACION HEADER HTTP CORS PARA QUE NO DE PROBLEMAS AL HACER PETICIONES A HTTP
app.use(cors());
//CONFIGURACION DE ROUTING
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);

module.exports = app;

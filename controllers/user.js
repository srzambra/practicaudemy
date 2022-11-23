const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

async function getMe(req, res) {
  const { user_id } = req.user; // req.user viene del middleware authenticated linea 27 le pase todos los datos

  const response = await User.findById(user_id); // aqui busca si hay uno igual por id

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado un usuario" });
  } else {
    res.status(200).send(response); // en response me muestra los resultados de la busqueda que puse mas arriba
  }
}

// ESTA ES LA FUNCION QUE DEVULVE TODOS LOS USUARIOS O SI ESTA ACTIVO O INACTIVO
async function getUsers(req, res) {
  const { active } = req.query; // query es el ? que esta en la url vamos a buscar el que este active

  let response = null;

  if (active === undefined) {
    response = await User.find(); // entonces los devuelve todos por eso User.find()  y aca no le paso nada para que muestre todos
  } else {
    response = await User.find({ active }); // de lo contrario puede ser que quiera activo o inactivos
  }

  res.status(200).send({ response });
}

// esta es la funcion para crear usuarios
async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false }); // haz una copia del body y modifica active y password para que llegue encriptada

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt); // estamos encriptando la password
  user.password = hasPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el usuario" });
    } else {
      res.status(201).send(userStored);
    }
  });
}

//esta es la funcion para actualizar los usuarios
async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  //password
  if (userData.password) {
    // si existe password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Actualizacion realizada con exito" });
    }
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el usuario" });
    } else {
      res.status(200).send({ msg: "Usuario eliminado con exito" });
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

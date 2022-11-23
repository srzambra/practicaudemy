const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

function register(req, res) {
  //ACA OBTENGO LOS DATOS QUE EL USUARIO ESCRIBIO EN EL FRONTEND
  const { firstname, lastname, email, password } = req.body; // asi obtengo los datos del body

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  const user = new User({
    //estos son los datos que se van a guardar en la base de datos
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  //ACA ENCRIPTAMOS LA CONTRASEÑA
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword; // aca le digo que user.password es igual al password pero encriptada
  //ACA SE GUARDA EL USUARIO EN LA BASE DE DATOS
  user.save((error, userStore) => {
    // aca tendremos el error en caso de que pase algo y el userstore (este va a ser el guardado) le podemos poner el nombre que queramos
    if (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
    } else {
      // en caso de que no haya error le enviamos el userstrorage que seria el nuevo nombre con todos los datos del usuario que escribio
      res.status(200).send(userStore);
    }
  });
}

//ESTA ES LA FUNCION PARA LOGEARSE SOLO RECIBE EL EMAIL Y PASSWORD
function login(req, res) {
  const { email, password } = req.body; // solo va a recibir el email y password

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  const emailLowerCase = email.toLowerCase(); //para que el email venga con minuscula

  User.findOne({ email: emailLowerCase }, (error, userStore) => {
    // vamos a buscar el email del usuario y aqui obtendremos el error o el userStored
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      // si llegamos hasta aca es porque encontro el usuario pero tenemos que comprobar que el password es el mismo
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "La contraseña es incorrecta" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "El usuario no esta autorizado" });
        } else {
          // si todo esto pasa hacemos un login
          res.status(200).send({
            access: jwt.createAccessToken(userStore), // el access recibe los datos del usuario que estan guardados en userStore
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      }); // es pa
    }
  });
}

function refreshAccessToken(req, res) {
  const { token } = req.body; // dentro del token que viene esta la id por eso tengo que decodificarlo
  if (!token) {
    res.status(400).send({ msg: "Token requerido" });
  }

  const { user_id } = jwt.decoded(token); //tengo que decodificar el token que me saque para rescatar la id

  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor " });
    } else {
      // de lo contrario no va a haber ningun error
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage), //tecnicamente se crea un nuevo access con mas informacion
      });
    }
  }); // quiero que me busques mediante el _id este user_id
}
module.exports = { register, login, refreshAccessToken };

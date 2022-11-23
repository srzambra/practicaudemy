const jwt = require("../utils/jwt");

// MIDDLEWARE DE AUTENTIFICACION si no te deja pasar a la funcion, no la vas a poder ejecutar y solo los usuarios que esten autenticados van a ser capaces de llegar a la funcion final

function asureAuth(req, res, next) {
  //next sirve para que cuando se ejecute next le dice al sistema que puede continuar con la funcion siguiente ("./user/usar",midleware,y la funcion)
  if (!req.headers.authorization) {
    // aca llega el token por la cabecera o headers
    return res
      .status(403)
      .send({ msg: "La peticion no tiene la cabecera de autentificacion" });
  }

  const token = req.headers.authorization.replace("Bearer ", ""); // replace queremos cambiar bearer por nada, bearer es una palabra que esta dentro es de programacion para que funcione

  try {
    const payload = jwt.decoded(token); // va a decodificar el token
    const { exp } = payload; // primero sacamos la fecha de expiracion
    const currentData = new Date().getTime(); // es la nueva fecha

    if (exp <= currentData) {
      // si la fecha de expiracion en menor que currentData entonces a caducado
      return res.status(400).send({ msg: "El token a expirado" });
    }
    // de lo contrario si el token no a expirado
    // acuerdate que la router es api.get("/user/me", [md_auth.asureAuth], UserController.getMe);req.user esta en el middleware y lo puedo obtener ya que me dejo pasar lo voy a ocupar en user controller para llevarle todos los datos del usuario que esta logiado ya
    req.user = payload; // payload es la informacion completa , le pongo req.user. porque quiero que el usuario llegue a user.js controllers
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

module.exports = { asureAuth };

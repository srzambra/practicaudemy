// TODO LO QUE TENGA RELACION CON JASON WEB TOKEN VA ACA

const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

//ESTA ES LA FUNCION PARA CREAR UN ACCESSTOKEN

function createAccessToken(user) {
  // va a recibir un user que son los datos del usuario

  //este es el tiempo que dura el token
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3); // esto es le estoy dando 3 horas al token

  //este es el
  const payload = {
    // el payload son los datos que van dentro del token
    token_type: "access",
    user_id: user._id,
    iat: Date.now(), //que es la fecha de creacion del token
    exp: expToken.getTime(), // es la fecha de expiracion del token
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

//ESTA ES LA FUNCION PARA REFRESCAR EL TOKEN

function createRefreshToken(user) {
  // va a recibir un user que son los datos del usuario

  //este es el tiempo que dura el token
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() + 1); // aca le estoy dando 1 mes de duracion al refresh

  //este es el
  const payload = {
    // el payload son los datos que van dentro del token
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(), //que es la fecha de creacion del token
    exp: expToken.getTime(), // es la fecha de expiracion del token
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

// ESTA ES LA FUNCION PARA DECODIFICA EL TOKEN QUE SACA LOS DATOS DEL TOKEN_REGEXP

function decoded(token) {
  return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};

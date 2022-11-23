// MONGOOSE ES PARA CONECTAR CON LA BASE D DATOS

const mongoose = require("mongoose"); // este es para la conexcion a la base de datos
const app = require("./app");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require("./constants");

const PORT = process.env.POST || 3977; // este va a ser el puerto donde se va a levantar el servidor http, process.env.port es la variable de entorno o sino que ocupe el puerto 3977

// ACA CONECTAMOS CON LA BASE DE DATOS

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
  (error) => {
    if (error) throw error;
    // UNA VEZ QUE SE CONECTE HAY QUE LEVANTAR EL APP ACA SE HACE

    app.listen(PORT, () => {
      // el lister es para que escuche
      console.log("##############");
      console.log("###APIREST####");
      console.log("##############");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  }
); // esto sale de mongo(online ) en la oarte add yout coneection string into yourt application code

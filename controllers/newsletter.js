const Newsletter = require("../models/newsletter");

//funciones de

function suscribeEmail(req, res) {
  const { email } = req.body;

  if (!email) res.status(400).send({ msg: "Email es obligatorio" });

  const newsletter = new Newsletter({ email: email.toLowerCase() }); //para que este en minuscula

  newsletter.save((error) => {
    if (error) {
      res.status(400).send({ msg: "El email ya esta ingresado" });
    } else {
      res.status(200).send({ msg: "Se ha guardado con exito" });
    }
  });
}

function getEmails(req, res) {
  const { page = 1, limit = 10 } = req.query; // este va a ser el numero de pagina y cual es el limite por pagina

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  Newsletter.paginate({}, options, (error, emailStored) => {
    // paginate es para que lo muestre por pagina , depues un arreglo vacio y despues opciones el callback va a arrojar o un error o los emails
    if (error) {
      res.status(400).send({ msg: "No se encontro paginas" });
    } else {
      res.status(200).send(emailStored);
    }
  });
}

function deleteEmail(req, res) {
  const { id } = req.params;

  Newsletter.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "No se pudo eliminar" });
    } else {
      res.status(200).send({ msg: "Se ha eliminado con exito" });
    }
  });
}

module.exports = { suscribeEmail, getEmails, deleteEmail };

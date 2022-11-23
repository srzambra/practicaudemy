const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
  title: String,
  path: String,
  order: Number, //para poder mover el menu de posicion
  active: Boolean,
});

module.exports = mongoose.model("Menu", MenuSchema); //tiene el nombre menu y vamos a enviar el MenuSchema

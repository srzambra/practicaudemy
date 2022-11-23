const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-Paginate");

const PostSchema = mongoose.Schema({
  title: String,
  miniature: String,
  content: String,
  path: {
    type: String,
    unique: true, //porque no puede haber dos iguales
  },
  create_at: Date, // fecha de creacion del post // este se crea de manera automatica
});

PostSchema.plugin(mongoosePaginate); // con esta linea se puede ocupara la paginacion en este modelo

module.exports = mongoose.model("Post", PostSchema);

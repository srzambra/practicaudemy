const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CourseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
});

CourseSchema.plugin(mongoosePaginate); //esta linea nos permite usar la paginacion en el modelo couseSchema

module.exports = mongoose.model("Course", CourseSchema); //lo vamos a llamaar Course y le pasamos el CouseShema

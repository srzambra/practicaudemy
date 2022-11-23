const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate"); // es para paginar se hace aca en el modelo

const NewsletterSchema = mongoose.Schema({
  email: { type: "string", unique: true },
});

NewsletterSchema.plugin(mongoosePaginate); // con esta linea podemos paginar

module.exports = mongoose.model("Newsletter", NewsletterSchema);

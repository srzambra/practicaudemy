const express = require("express");
const multiparty = require("connect-multiparty"); //permite subir imagenes
const PostController = require("../controllers/post");

const md_auth = require("../middlewares/authenticated");

//LE DIGO DONDE SE TIENE QUE GUARDAR LA INFORMACION las fotos
const md_upload = multiparty({ uploadDir: "./uploads/blog" });

const api = express.Router();

//Routes

api.post("/post", [md_auth.asureAuth, md_upload], PostController.createPost);
api.get("/post", PostController.getPosts); // va a ser publico porque todo el mundo va a poder ver los post
api.patch(
  "/post/:id",
  [md_auth.asureAuth, md_upload],
  PostController.updatePost
);
api.delete("/post/:id", [md_auth.asureAuth], PostController.deletePost);
api.get("/post/:path", PostController.getPost);
module.exports = api;

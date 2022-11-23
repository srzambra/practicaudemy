const Post = require("../models/post");
const image = require("../utils/image");

//Funciones

async function createPost(req, res) {
  const post = new Post(req.body); // le pasamos el re
  post.create_at = new Date(); // este es para darle la fecha o sea del req.body llega toda la insfo y pesco el campo date y lo actualizo

  const imagePath = image.getFilePath(req.files.miniature); // req.files.miniature es donde viene la imagen
  post.miniature = imagePath;

  post.save((error, postStored) => {
    if (error) {
      res.status(400).send({ msg: "No se pudo guardar el post" });
    } else {
      res.status(200).send(postStored);
    }
  });
}

async function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query; // limit es el numero de item por pagina, y la page empieza en 1 eso lo obtenemos de la query

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_ad: "desc" }, //con sort ordenamos de forma descendente de lo mas nuevo a lo mas viejo
  };

  Post.paginate({}, options, (error, postStored) => {
    if (error) {
      res.status(400).send({ msg: "error al obtener los post" });
    } else {
      res.status(200).send(postStored);
    }
  });
}

function updatePost(req, res) {
  const { id } = req.params;
  const postData = req.body; // estos son los datos que vienen por el body

  if (req.files.miniature) {
    // tengo que ver si existe algunaa foto si la envia o no en este caso si la envia
    const imagePath = image.getFilesPath(req.files.miniature);
    postData.miniature = imagePath;
  }

  Post.findByIdAndUpdate({ _id: id }, postData, (error) => {
    if (error) {
      res.status(400).send({ msg: "no se pudo actualizar los datos" });
    } else {
      res
        .status(200)
        .send({ msg: "Los datos se han actualizado correctamente" });
    }
  }); // aca dice que el id que viene es el que tengo que actualizar y tengo que actualizarlo con postData
}

function deletePost(req, res) {
  const { id } = req.params;

  Post.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "No se pudo eliminar el post" });
    } else {
      res.status(200).send({ msg: "Elminado con exito" });
    }
  });
}

function getPost(req, res) {
  const { path } = req.params;

  Post.findOne({ path }, (error, postStored) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else if (!postStored) {
      // if postStored no tiene contenido entonces
      res.status(400).send({ msg: "No se ha encontrado ningun post" });
    } else {
      res.status(200).send(postStored);
    }
  });
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
};

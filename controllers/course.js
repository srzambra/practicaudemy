const Course = require("../models/course");
const image = require("../utils/image");

async function createCourse(req, res) {
  const course = new Course(req.body);

  const imagePath = image.getFilePath(req.files.miniature); //vamos a recibir imagenes y aca procesamos imagenes
  course.miniature = imagePath;

  course.save((error, courseStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al subir el courso" });
    } else {
      res.status(201).send(courseStored);
    }
  });
}

async function getCourses(req, res) {
  //esta parte es de paginacion para no recibir todos los cursos de una
  const { page = 1, limit = 10 } = req.query; // en caso de que no llegue nada ponemos page valor 1
  const options = {
    page: parseInt(page), //parseInt es como pedirle que me devuelva numeros enteros
    limit: parseInt(limit), //LIMIT ES LA CANTIDAD de elementro que quiero por pagina , y paseInt intenta devolver un entero
  };
  Course.paginate({}, options, (error, courses) => {
    // le pasamos el objeto vacio {} y las options
    if (error) {
      // si error existe entonces
      res.status(400).send({ msg: "Error al obtener los cursos" });
    } else {
      res.status(200).send(courses);
    }
  });
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const courseData = req.body;

  if (req.files.miniature) {
    // este es si existe una fotografia
    const imagePath = image.getFilePath(req.files.miniature);
    courseData.miniature = imagePath; // solo si manda una foto se va a actualizar o sino no
  }

  Course.findByIdAndUpdate({ _id: id }, courseData, (error) => {
    if (error) {
      res.status(400).send({ msg: "No se ha podido actualizar" });
    } else {
      res.status(200).send({ msg: "Actualizado con exito" });
    }
  }); // buscame el id que sea igual a esta id y me guardas los datos en coursedata
}

async function deleteCourse(req, res) {
  const { id } = req.params;

  Course.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "No se ha podido eliminar" });
    } else {
      res.status(200).send({ msg: "Se ha eliminado con exito" });
    }
  });
}

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };

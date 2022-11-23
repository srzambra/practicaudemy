const Menu = require("../models/menu");

async function createMenu(req, res) {
  const menu = new Menu(req.body);

  menu.save((error, menuStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el menu" });
    } else {
      res.status(200).send(menuStored);
    }
  });
}

async function getMenus(req, res) {
  const { active } = req.query; // de aca obtenemos el active si es true o false

  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" }); // si active es undefined me devuelve todo, el .sort lo que hace es ordenarlo todopor orden al realizar la orden, y quiero que me lo ordenes mediante la propiedad order, quiero que pesque la propiedad order y la ordenes de manera ascendente
  } else {
    response = await Menu.find({ active }).sort({ order: "asc" }); // caso contrario me devuelve active
  }

  if (!response) {
    // si response no tiene valor entonces
    res.status(400).send({ msg: "No se ha encontrado ningun meni" });
  } else {
    res.status(200).send(response);
  }
}

async function updateMenu(req, res) {
  const { id } = req.params; // para actualizar por id
  const menuData = req.body; // menuData son los datos que me llegan

  Menu.findByIdAndUpdate({ _id: id }, menuData, (error) => {
    if (error) {
      // me devolvera un error en caso de que encuentre el error
      res.status(400).send({ msg: "Error al actualizar la informacion" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" }); // ya lo actualizo la info en menuData
    }
  }); // le pedimos que encuentre por id y lo actualice con la data que viene en menuData que es la informacion que esta en le req.menu
}

async function deleteMenu(req, res) {
  const { id } = req.params;

  Menu.findByIdAndDelete({ _id: id }, (error) => {
    //me devolvera error en caso de que haya
    if (error) {
      res.status(400).send({ msg: "No se pudo eliminar el menu " });
    } else {
      res.status(200).send({ msg: "El menu se ha eliminado con exito" });
    }
  });
}

module.exports = { createMenu, getMenus, updateMenu, deleteMenu };

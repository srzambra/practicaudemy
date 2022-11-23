const express = require("express");
const MenuController = require("../controllers/menu");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

//ENDPOINTS
api.post("/menu", [md_auth.asureAuth], MenuController.createMenu);
api.get("/menu", MenuController.getMenus); // se pueden llamar igual porque uno es get y el otro es post, no va a ser necesario un middleware ya que el menu se puede obtener desde el back o del cliente osea desde el panel de administrador como de la pagina web
api.patch("/menu/:id", [md_auth.asureAuth], MenuController.updateMenu); // es patch ya que el menu se va a poder actualizar de manera parcial solo los campos que le lleguen
api.delete("/menu/:id", [md_auth.asureAuth], MenuController.deleteMenu);
module.exports = api;

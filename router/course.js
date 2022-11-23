const express = require("express");
const multiparty = require("connect-multiparty"); //es para mandar imagenes
const CourseController = require("../controllers/course");
const md_auth = require("../middlewares/authenticated");
const md_upload = multiparty({ uploadDir: "./uploads/course" });

const api = express.Router();

api.post(
  "/course",
  [md_auth.asureAuth, md_upload],
  CourseController.createCourse
);
api.get("/courses", CourseController.getCourses);
module.exports = api;

api.patch(
  "/course/:id",
  [md_auth.asureAuth, md_upload],
  CourseController.updateCourse
); // patch porque queremos actualizar parcialmente solo lo que el cliente nos mande no todo

api.delete("/course/:id", [md_auth.asureAuth], CourseController.deleteCourse);

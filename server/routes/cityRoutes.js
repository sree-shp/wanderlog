const express = require("express");
const cityController = require("../controllers/cityController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, cityController.getAllCities)
  .post(authController.protect, cityController.createCity);

router
  .route("/:id")
  .get(authController.protect, cityController.getCity)
  .patch(authController.protect, cityController.updateCity)
  .delete(authController.protect, cityController.deleteCity);

module.exports = router;

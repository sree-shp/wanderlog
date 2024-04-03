const express = require("express");
const cityController = require("../controllers/cityController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protected Route to access All cities and create new city
router
  .route("/")
  .get(authController.protect, cityController.getAllCities)
  .post(authController.protect, cityController.createCity);

// Protected Route to access city based on Id and update city and delete city
router
  .route("/:id")
  .get(authController.protect, cityController.getCity)
  .patch(authController.protect, cityController.updateCity)
  .delete(authController.protect, cityController.deleteCity);

module.exports = router;

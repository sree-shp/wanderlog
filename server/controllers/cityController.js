const City = require("../models/cityModel");

// Controller to get all cities
exports.getAllCities = async (req, res, next) => {
  try {
    // Find and store all cities in City model
    const cities = await City.find();

    // Send response with status code 200, and with the data of cities
    res.status(200).json({
      status: "success",
      data: { cities },
    });
  } catch (err) {
    // Send Response with status code 400 and with the error message
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller to create a new city
exports.createCity = async (req, res, next) => {
  try {
    // Store the user Id from the user object in req
    const userId = req.user.id;

    //Create a new city of city model with the data recieved from the client request
    const city = await City.create({
      userId: userId,
      cityName: req.body.cityName,
      country: req.body.country,
      emoji: req.body.emoji,
      date: req.body.date,
      notes: req.body.notes,
      position: req.body.position,
    });

    // Send response with status code 201, and with the data of new city
    res.status(201).json({
      status: "success",
      data: {
        city,
      },
    });
  } catch (err) {
    // Send Response with status code 400 and with the error message
    res.status(400).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

// Controller to get city based on Id
exports.getCity = async (req, res, next) => {
  try {
    // Find One city that matches the id and store it
    const city = await City.findOne({ _id: req.params.id });

    // Send response with status code 20, and with the data of city
    res.status(200).json({
      status: "success",
      data: {
        city,
      },
    });
  } catch (err) {
    // Send Response with status code 400 and with the error message
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller to update city based on id
exports.updateCity = async (req, res, next) => {
  try {
    // Store the update data from the client request
    const cityUpdate = req.body;

    // Find by Id and Update the city and store it
    const city = await City.findByIdAndUpdate(
      { _id: req.params.id },
      cityUpdate
    );

    // Send response with status code 200, and with the data of the city
    res.status(200).json({
      status: "success",
      data: { city },
    });
  } catch (err) {
    // Send Response with status code 400 and with the error message
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller to delete the city based on id;
exports.deleteCity = async (req, res, next) => {
  try {
    // Find by Id and Delete the city
    const city = await City.findByIdAndDelete({ _id: req.params.id });
    // Send response with status code 204, and with the data as null
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    // Send Response with status code 400 and with the error message
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

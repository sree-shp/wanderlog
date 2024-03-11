const City = require("../models/cityModel");

exports.getAllCities = async (req, res, next) => {
  try {
    const cities = await City.find();

    res.status(200).json({
      status: "success",
      data: { cities },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createCity = async (req, res, next) => {
  try {
    const userId = res.user.id;
    const city = await City.create({
      userId: userId,
      cityName: req.body.cityName,
      country: req.body.country,
      emoji: req.body.emoji,
      date: req.body.date,
      notes: req.body.notes,
      position: req.body.position,
    });

    res.status(201).json({
      status: "success",
      data: {
        city,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

exports.getCity = async (req, res, next) => {
  try {
    const id = req.params.id;
    const city = await City.findOne({ _id: id });

    res.status(200).json({
      status: "success",
      data: {
        city,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateCity = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cityUpdate = req.body;
    const city = await City.findByIdAndUpdate(id, cityUpdate);
    res.status(200).json({
      status: "success",
      data: { city },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteCity = async (req, res, next) => {
  try {
    const id = req.params.id;
    const city = await City.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

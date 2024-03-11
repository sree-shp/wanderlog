const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: [true, "Should have a userID"],
  },
  cityName: {
    type: String,
    required: [true, "Should have a city name"],
  },
  country: {
    type: String,
  },
  emoji: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, "Should have a Date"],
  },
  notes: {
    type: String,
  },
  position: {
    lat: {
      type: Number,
      required: [true, "Should have a latitude"],
    },
    lng: {
      type: Number,
      required: [true, "Should have a longitude"],
    },
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;

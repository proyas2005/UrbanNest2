const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["customer", "housemaid"],
    default: "customer"
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  experienceYears: {
    type: Number,
    default: 0
  },
  serviceArea: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);
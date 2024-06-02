// model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the schemas
const userSchema1 = new Schema({
  account: Number,
  name: String,
  address: String,
});

const userSchema2 = new Schema({
  newValue: Number,
  oldValue: Number,
});

// Create models
const User1 = model('User1', userSchema1);
const User2 = model('User2', userSchema2);

// Export the models
module.exports = {
  User1,
  User2,
};



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

const userSchema3 = new Schema({
  total: Number,
});

const userSchema4 = new Schema({
  pay: Number,
});

// Create models
const User1 = model('User1', userSchema1);
const User2 = model('User2', userSchema2);
const User3 = model('User3', userSchema3);
const User4 = model('User4', userSchema4);

// Export the models
module.exports = {
  User1,
  User2,
  User3,
  User4,
};
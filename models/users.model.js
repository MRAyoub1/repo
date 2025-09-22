const mongoose = require('mongoose');
const  validator = require('validator');
const usersSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
  },
    Lastname: {
        type: String,
        required: true
  },
    Email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Write ur Email !"] 
  },
    PassWord: {
        type: String,
        required: true,
  },
    Token: {
        type: String,
  },




});


module.exports = mongoose.model('User', usersSchema, 'MyUsers');

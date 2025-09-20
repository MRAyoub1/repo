const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('Student', studentsSchema, 'MydataStudents');

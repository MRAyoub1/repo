const StudentModel = require('../models/StudentsModels'); 
const { param } = require('../routs/studentsRouter');
const httpStatusText = require('../utils/httpStatustext');

// Get all students
const GetAllStudents = async (req, res) => {
  // get daba from req (limit-page)
  const query = req.query;

  const limit = query.limit || 3;
  const page = query.page || 1;
  const skip = +limit * (+page - 1);
  try {
    const students = await StudentModel.find({}, {"__v": false}).limit(limit).skip(skip);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.FAIL, message: err.message });
  }
};

// Get one student
const GetStudent = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.studentID);
    if (!student) {
      return res.status(404).json({ status: httpStatusText.FAIL, message: "Student not found" });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

// Add student
const AddStudent = async (req, res) => {
  if (!req.body.Title) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "Title is required" });
  }
  if (!req.body.Age) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "Age is required" });
  }

  try {
    const newStudent = new StudentModel(req.body);
    await newStudent.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { newStudent } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

// Update student
const UpdateStudent = async (req, res) => {
  try {
    const student = await StudentModel.findByIdAndUpdate(
      req.params.studentID,
      { $set: { ...req.body } },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ status: httpStatusText.FAIL, message: "ID not found" });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

// Delete student
const DeleteStudent = async (req, res) => {
  try {
    const student = await StudentModel.findByIdAndDelete(req.params.studentID);
    if (!student) {
      return res.status(404).json({ status: httpStatusText.FAIL, message: "Student not found" });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

module.exports = {
  GetAllStudents,
  GetStudent,
  AddStudent,
  UpdateStudent,
  DeleteStudent
};

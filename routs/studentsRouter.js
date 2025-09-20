const express = require('express');
const StudentConsoler = require('../controlers/studentsControler');
const router = express.Router();


// get all students // Add Student
router.route('/')
    .get(StudentConsoler.GetAllStudents)
    .post(StudentConsoler.AddStudent)

// get a student // Update student  //delete student 
router.route('/:studentID')
    .get(StudentConsoler.GetStudent)
    .patch(StudentConsoler.UpdateStudent)
    .delete(StudentConsoler.DeleteStudent)



module.exports = router;
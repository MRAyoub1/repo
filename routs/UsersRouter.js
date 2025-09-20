const express = require('express');
const router = express.Router();
const UsersContoler = require('../controlers/usersControler');
const verifyToken = require('../models/verifyToken')
const multer = require('multer')
const uploades = multer({dest: 'uploades/'})

// get all users
router.route('/')
    .get(verifyToken, UsersContoler.GetAllUsers)



// Login
router.route('/login')
    .post(UsersContoler.Login)


// register
router.route('/register')
    .post(uploades.single('avatar'), UsersContoler.Register)




module.exports = router;
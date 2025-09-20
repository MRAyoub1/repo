const UsersModel = require('../models/users.model');
const httpStatusText = require('../utils/httpStatustext');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const GetAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.find({}, {"__v": false, PassWord: false});
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
  }catch (err) {
    return res.status(500).json({ status: httpStatusText.FAIL, message: err.message });
  }
};

const Register = async (req, res) => {
    const {Firstname,Lastname,Email,PassWord} = req.body
  if (!Firstname) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "firstname is required" });
  }
  if (!Lastname) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "lastname is required" });
  }  
  if (!Email) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "email is required" });
  }  
  if (!PassWord) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "password is required" });
  }
  const scriptedPassword = await bcrypt.hash(PassWord, 10)
  try {
    const newUser = new UsersModel({
        Firstname: Firstname,
        Lastname: Lastname,
        Email: Email,
        PassWord: scriptedPassword,
    });

    // create JWT token 
    const token = await jwt.sign({Email: newUser.Email, id: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    console.log({token: token});
    await newUser.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { newUser } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const Login = async (req, res) => { 
    const {Email,PassWord} = req.body;
  if (!Email) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "email is required" });
  }  
  if (!PassWord) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "password is required" });
  }

    const user = await UsersModel.findOne({ Email: Email });
    const matchedPassword = await bcrypt.compare(PassWord, user.PassWord)


  if (user && matchedPassword){
    const token = await jwt.sign({Email: user.Email, id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1m'});
    return res.status(200).json({ status: httpStatusText.SUCCESS, message: "success data", data: {token}});
  }else{
    return res.status(500).json({ status: httpStatusText.FAIL, message: "invalid data"});
  }
};






module.exports = {
    GetAllUsers,
    Register,
    Login,
}



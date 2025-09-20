const httpStatusText = require('./utils/httpStatustext');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const studentsRouter = require('./routs/studentsRouter')
const usersRouter = require('./routs/UsersRouter')
const path = require('path');


mongoose.connect(url).then(() => {
    console.log("connect to db");
})

app.use(express.json());

app.use('/api/students', studentsRouter);
app.use('/api/users', usersRouter);
app.use('/uploades', express.static(path.join(__dirname, 'uploades')));



app.use((req, res) => {
    res.status(404).json({status: httpStatusText.ERROR, message: "page not found"} )
})

// run server
app.listen(port, () => {
    console.log(`listening on port : ${port}`)
    console.log('http://localhost:5000');
})
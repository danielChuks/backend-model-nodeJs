const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

//database connection...
const con = require('./db/connecton')

//port declaration
require('dotenv').config()
const PORT = process.env.PORT || 5700;

//Importing the routes .....
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(cookieParser());




app.use('/', indexRouter)
app.use('/users', usersRouter)


app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})




module.exports = app;


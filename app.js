const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
// const { errorhandler } = require('./middleWare/errorMiddleWare')
const cookieParser = require('cookie-parser');

//port declaration................................
require('dotenv').config();
const PORT = process.env.PORT || 5700;

//database connection..............................
const con = require('./db/connecton');
con();


//Importing the routes ............................
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRoutes');
const adminRouter = require('./routes/adminRoutes');
const postRoutes = require("./routes/postRoutes");

//middleware function calling .....................
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// routes declarations ............................
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/post', postRoutes);

// port function....................................
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});




module.exports = app;


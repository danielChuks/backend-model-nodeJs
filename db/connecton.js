const mongoose = require('mongoose');
const dotenv = require('dotenv');

// connecting to mongodb  atlas or mongodb on my local machine.....
const uri = process.env.DBCONNECTION || 'mongodb://localhost/controllers'; 

mongoose.connect(uri, { useNewUrlParser: true });
const con = mongoose.connection;


con.on('open', () => {
  console.log('data base is connected');
});

module.exports = con;




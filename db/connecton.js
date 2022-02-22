const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// connecting to mongodb  atlas or mongodb on my local machine.....
const uri = process.env.DBCONNECTION || 'mongodb://localhost/controllers'; 

console.log('connection uri: ',uri)

mongoose.connect(uri, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
  console.log('data base is connected');
});

module.exports = con;




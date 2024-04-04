const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connection = async()=> {
    mongoose.connect(process.env.Mongo)
  console.log("db is connected");
}
module.exports = {connection}
const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = process.env.dbURL;
exports.connectToDB = ()=>{
    console.log("Connecting to DB");
    mongoose.connect(dbURL).then(()=>{console.log("Connection Established!")}).catch((err)=>{console.log("Error Encountered!");console.log(err)})
}
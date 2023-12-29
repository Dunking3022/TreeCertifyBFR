const xlsx = require('xlsx');
const mongoose = require('mongoose');
const Donor = require('../Models/Donor');
const generateCertificate = require('./generateCertificate');

module.exports = async (req,res)=>{
    const filebuffer = req.file.buffer;
    console.log(filebuffer);
    const file = xlsx.read(filebuffer, { type: 'buffer' });
    const userJSON = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
    console.log(userJSON);
    Donor.insertMany(userJSON)
    .then(()=>{
        res.send("Documents Added to Database! Please check your mailbox!")
    })
    .catch((err)=>{
        res.send("Error creating Documents. Try again later!");
        console.log(err);
    })
}

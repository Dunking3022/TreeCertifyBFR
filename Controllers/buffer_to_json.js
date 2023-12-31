const xlsx = require('xlsx');
const mongoose = require('mongoose');
const Donor = require('../Models/Donor');
const generateCertificate = require('./generateCertificate');

module.exports = async (req,res)=>{
    try{
    const filebuffer = req.file.buffer;
    console.log(filebuffer);
    const file = xlsx.read(filebuffer, { type: 'buffer' });
    const userJSON = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
    console.log(userJSON);
    Donor.insertMany(userJSON)
    .then(()=>{
        res.render("confirmation");
    })
    .catch((err)=>{
        res.send("Error creating Documents. Try again later!");
        console.log(err);
    })
    }
    catch(err){
        res.status(422).send("Please select a valid file and try again.");

    }
}

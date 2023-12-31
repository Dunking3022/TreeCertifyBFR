const mongoose = require('mongoose');
const Donor = require('../Models/Donor');

exports.fetchData = async (uid)=>{
    try{
        const userData = await Donor.findById(uid); 
        return userData;
    }
    catch(err){
        return null;
    }
} 
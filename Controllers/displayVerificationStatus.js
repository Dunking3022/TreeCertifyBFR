
const fetchData = require("./fetchUserData.js");

module.exports = async (req,res)=>{
    const id = req.params.id;
    const tData = await fetchData.fetchData(id);
    if(!tData){
        const tableData = {Status : "Invalid Verification ID"};
        res.render("verification",{tableData});
    }
    else{  
        const {_id, __v, Phone ,...tableData} = tData.toObject();
        res.render('verification',{tableData});
    }
}
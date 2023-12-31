const express = require('express');
const app = express();
const db = require('./Middlewares/db');
const path = require('path');
const email = require('./Controllers/emailhandler.js')
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')))
const xlreader =  require('./Controllers/xltojson');
const multer = require('multer');
const generateCertificate = require('./Controllers/generateCertificate');
const buffer_to_json = require('./Controllers/buffer_to_json.js');
const storage = multer.memoryStorage(); 
const upload = multer({storage: storage});
const fetchData = require("./Controllers/fetchUserData.js");
const { table } = require('console');
const displayVerificationStatus = require('./Controllers/displayVerificationStatus.js');

db.connectToDB();

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'Views'));

app.get('/getjson',xlreader);

app.get('/upload',(req,res)=>{
    res.render('upload');
})

app.get('/certificate',(req,res)=>{
    res.render('certificate');
})

app.get('/verify/:id',displayVerificationStatus)

app.post('/upload',upload.single('uploadfile'),buffer_to_json)

app.get('/',(req,res)=>{
    res.render('upload');
})

app.listen(PORT,()=>{console.log("Server running on port 3001")});

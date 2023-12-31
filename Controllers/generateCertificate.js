const fs = require('fs');
const mongoose = require('mongoose'); 
const {
  createCanvas,
  loadImage,
  registerFont,
} = require('canvas');
var qr = require('qrcode')



exports.generateCertificate = async (arg, id, idate)=>{
  console.log(">>Generating Certificate for "+arg.Email);
  const imgName = Date.now()+arg.Name;
  const backgroundImage = await loadImage('./bin/template.png');
  registerFont('./Fonts/Luciole-Regular.ttf', { family: 'Luciole' });
  const imageCanvas = createCanvas(backgroundImage.width, backgroundImage.height, 'pdf');
  const context = imageCanvas.getContext('2d');
  context.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);
  context.font = '69px Luciole';
  context.textAlign='center';
  context.textBaseline = 'middle';
  context.fillText(arg.Name, 1000, 570);
  context.textAlign='center';
  context.fillStyle = 'brown';
  context.fillText(arg.TreeCount, 1000, 795);
  context.font = '30px Luciole';
  context.fillStyle = 'black';

  const qrCodeData = `https://treecertifybfr.onrender.com/verify/${id}`;
  const qrCodeImage = await qr.toBuffer(qrCodeData, { type: 'png' });
  const qrCodeImageObject = await loadImage(qrCodeImage);
  context.drawImage(qrCodeImageObject, 1600, 795, 200, 200);

  
  context.textAlign='center';
  context.fillStyle = 'black';
  context.font = '20px Luciole';
  context.fillText("Scan to verify", 1695, 1009);

  const issueDate = "Issued on : "+idate;
  context.fillText(issueDate,1000,1360);
  fs.writeFile("./testing.pdf",imageCanvas.toBuffer('file/pdf'),(err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File saved successfully:');
    }
  });
  return(imageCanvas.toBuffer('file/pdf'));
}

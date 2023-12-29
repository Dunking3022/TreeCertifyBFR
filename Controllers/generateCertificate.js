const fs = require('fs');
const mongoose = require('mongoose'); 
const {
  createCanvas,
  loadImage,
  registerFont,
} = require('canvas');


exports.generateCertificate = async (arg)=>{
  console.log(">>Generating Certificate for "+arg.mail);
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
  const today = new Date();
  const issueDate = "Issued on : "+today.toUTCString();
  context.fillText(issueDate,1000,1360);
  return(imageCanvas.toBuffer('file/pdf'));
}
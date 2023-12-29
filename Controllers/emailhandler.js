// import email from 'emailjs';
const nodemailer = require("nodemailer");
const emailtemplate = require("./emailtemplate");

exports.transferMail = async (filebuffer, userName, treeCount, userEMAIL) => {
  return new Promise((resolve, reject) => {
    const mail = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "treecertify@gmail.com",
        pass: process.env.appkey,
      },
    });

    mail.sendMail(
      {
        from: "treecertify@gmail.com",
        to: userEMAIL,
        subject: "Heartfelt Thanks for Your Tree-Planting Contribution 🌳",
        html: emailtemplate.getHTML(userName, treeCount),
        attachments: [
          {
            filename: `${userName.split(" ")[0]}'s Certificate.pdf`,
            content: filebuffer,
            encoding: 'base64',
            contentType: "file/pdf",
          },
        ],
      },
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};

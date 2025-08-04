const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise'); // Changed to mysql2
const bodyParser = require('body-parser');
const path = require('path');

const HTTP_PORT = process.env.PORT || 3000;
//---------------------------------------------------------------------------------------------
app.listen(HTTP_PORT,()=>{
    console.log(`Server is running on port ${HTTP_PORT}`);
});
//-------------------------------------------------
//sending mails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "yasirukodikara20@gmail.com",
    pass: "ynns dgvc atri dcag",
  },
});

   //Send an email
        // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: "yasirukodikara2@gmail.com", // sender address
        to: email, // list of receivers
        subject: "🎉 Welcome to MathPlus Education!", // Subject line
        text: `Hello!

        Thank you for registering with MathPlus Education.

        Your account has been successfully created. You're now ready to start your learning journey with us—explore courses, take quizzes, and track your progress anytime.

        If you didn’t register for this account, please contact our support team immediately.

        Welcome aboard!
        – MathPlus Education Team`, // plain text body
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #2c3e50;">🎉 Welcome to MathPlus Education!</h2>
                <p>Hello!</p>
                <p>Thank you for <strong>registering</strong> with <strong>MathPlus Education</strong>.</p>
                <p>Your account has been successfully created, and you're now all set to begin your personalized learning experience. Dive into lessons, quizzes, and track your progress as you grow!</p>
                <p>If you didn’t create this account, please contact our <a href="https://mathplus.com/support" style="color: #3498db;">support team</a> immediately.</p>
                <br>
                <p>We're excited to have you on board!<br><strong>– MathPlus Education Team</strong></p>
            </div>
            ` // html body
                });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }


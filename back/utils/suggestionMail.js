import { userModel as user } from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

export const suggestionMail = asyncHandler(async (req, res) => {
  const user_list = await user.find();
  user_list.map((data) => {
    const no_of_dress = data.addedDress.length;
    const randomDress = Math.floor(Math.random() * (no_of_dress - 1) + 1);
    const { dressImage, accImage, dressType, dressColor, category } =
      data.addedDress[randomDress];

    sendmail(
      dressImage.url,
      accImage.url,
      dressType,
      category,
      dressColor,
      data.email
    );
  });
  // sendEmail();
});

const sendmail = asyncHandler(
  async (dressImage, accImage, dressType, category, dressColor, toEmail) => {
    console.log(dressImage);
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    const htmlContent = `<table>
            <tr><td><b>Category:</b></td><td>${category}</td></tr>
            <tr><td><b>Dress Type:</b></td><td>${dressType}</td></tr>
            <tr><td><b>Dress Color:</b></td><td>${dressColor}</td></tr>
        </table>`;
    // send mail with defined transport object
    const today = new Date();
    const todayDate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: toEmail, // list of receivers
      subject: `Color Sugesstion for Today (${todayDate})`, // Subject line
      html: htmlContent, // html body
      attachments: [
        {
          filename: "DressImage.png",
          path: dressImage,
        },
        {
          filename: "AccImage.png",
          path: accImage,
        },
      ],
    });
  }
);

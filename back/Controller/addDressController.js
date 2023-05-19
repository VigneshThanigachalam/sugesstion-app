import { userModel as user } from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const addDress = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { dressType, color, category } = req.body;
  const { dressImage, accImage } = req.files;
  var addDressdetails = {
    category: category,
    dressType: dressType,
    dressColor: color,
    dressImage: {
      url: dressImage[0].path,
    },
    accImage: {
      url: accImage[0].path,
    },
  };
  try {
    await user.findByIdAndUpdate(
      id,
      { $push: { addedDress: addDressdetails } },
      { new: true }
    );

    res.json({
      message: "successfully added",
    });
  } catch (err) {
    res.json({
      message: "some went wrong",
    });
  }
});

export const getsavedDress = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const person = await user.findById(id);
    const dress = person.addedDress;
    res.json({
      data: dress,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, res) => `colorSuggestionapp/${req.user.id}`,
  },
});

export const upload = multer({ storage: storage }).fields([
  { name: "dressImage" },
  { name: "accImage" },
]);

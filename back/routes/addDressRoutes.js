import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addDress,
  upload,
  getsavedDress,
} from "../Controller/addDressController.js";

export const addDressRouter = express.Router();
addDressRouter.post("/addDress", authMiddleware, upload, addDress);
addDressRouter.get("/savedDress", authMiddleware, getsavedDress);

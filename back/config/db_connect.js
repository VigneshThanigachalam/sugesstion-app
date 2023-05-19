import mongoose from "mongoose";

export const db_connect = () => {
  const uri = process.env.MONGODB_URL;
  try {
    const conn = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

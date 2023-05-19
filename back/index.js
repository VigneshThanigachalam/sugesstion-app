import express from "express"; // "type": "module"
import { db_connect } from "./config/db_connect.js";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { authRouter } from "./routes/authRoutes.js";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { addDressRouter } from "./routes/addDressRoutes.js";
import cron from "node-cron";
import { suggestionMail } from "./utils/suggestionMail.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

db_connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieparser());

const PORT = process.env.PORT;
app.get("/", function (req, res) {
  // res.cookie("name","na");
  res.send("🙋‍♂️, 🌏 🎊✨");
});
app.use("/api/user", authRouter);
app.use("/api/user-request", addDressRouter);
// app.use("/api/user/:id", authMiddleware, addDressRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

// schedule a mail for every day 7 o clock

cron.schedule("* 5 * * *", () => {
  suggestionMail();
});

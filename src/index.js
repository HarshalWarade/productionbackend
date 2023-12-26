import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config();

import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.log("Error at port: ", err);
      } else {
        console.log(`Server is running on port ${process.env.PORT}`);
      }
    });
  })
  .catch((err) => {
    console.log("DB Connection failed: ", err);
  });

/*

import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.DB}/${DB_NAME}`);
    app.listen(process.env.PORT, () => {
      console.log(`Application is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

*/

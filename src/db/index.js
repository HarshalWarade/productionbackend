import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(`${process.env.DB}`);
    console.log(`MongoDB Connected!! -> ${connectionResponse.connection.host}`);
  } catch (error) {
    console.log("DB Connection Error: ", error);
    process.exit(1);
  }
};


export default connectDB;

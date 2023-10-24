import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return console.log("Already connected to mongodb");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL_ONLINE || "");
    isConnected = true;
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

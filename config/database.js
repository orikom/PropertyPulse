import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //if the db is alreaddy connected- dont connect again...
  if (connected) {
    console.log("mngodb is already connected");
    return;
  }

  //connect to moongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongodDB connected...");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;

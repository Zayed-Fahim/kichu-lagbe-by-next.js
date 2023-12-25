import mongoose from "mongoose";

const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL || "mongodb://localhost:27017/kichu-lagbe";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return await mongoose.connection.asPromise();
  }
  return await mongoose.connect(MONGODB_URL);
};
